import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
//import Constants from 'expo-constants';
import { Feather,AntDesign } from '@expo/vector-icons';

export default function App() {

  const buttonValues = ['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'];
  const signs = ['*','/','+','-'];
  const signsAll = ['*','/','+','-','(',')','sqr'];
  const characters = ['Calcule os parenteses','Calcule as multiplicações','Calcule as Divisões','Calcule as adições','Calcule as subtrações']

  const [arrays,setArrays] = useState([]);
  const [arraysView,setArraysView] = useState(['_']);
  const [indexes,setIndexes] = useState([0]);
  const [indexesPositions,setIndexesPositions] = useState(0);
  const [result,setResult] = useState([]);

  var arrV = [...arraysView];
  var idx = [...indexes];
  var pos = indexesPositions;

  var parAdd = false;

  const calculator = (n) => {
    let arr = selectArray([...arrays],0);

    if(n=='sqr'){

    }
    else if(n=='par'){
      arr.splice(idx[pos],0,'(',[],')');
      idx[pos]++;      
      parAdd = true;
    }
    else if(n=='del'){
      if(idx[pos]>0){
        if(arr[idx[pos]-1]!=')'){
          arr.splice(idx[pos]-1,1);
          idx[pos]--;
        }
      }
    }
    else if(n=='delAll'){
      arr = [];
      arrV = [];
      idx = [0];
      pos = 0;
    }
    else if(n=='left'){
      if(idx[pos]>0){
        if(arr[idx[pos]-1]==')'){
          idx[pos]-=2;
          pos++;
          arr = selectArray([...arrays],0);
          idx[pos] = arr.length;
        }
        else
          idx[pos]--;        
      }
      else{
        if(pos>0){//sair do parenteses
          pos--;
          idx[pos]--;
          idx.pop();
          arr = selectArray([...arrays],0);
        }
      }
    }
    else if(n=='right'){
      if(idx[pos]<arr.length){
        if(arr[idx[pos]]=='('){
          idx[pos]++;
          pos++;
          arr = selectArray([...arrays],0);
          idx[pos] = 0;
        }
        else
          idx[pos]++; 
      }
      else{
        if(pos>0){//sair do parenteses
          pos--;          
          idx[pos]+=2;
          idx.pop();  
          arr = selectArray([...arrays],0);        
        }
      }
    }
    else{
      arr.splice(idx[pos],0,n);
      idx[pos]++;
    }
    
    

    let array = updateArray([...arrays],[...arr],0);

    arrV = [...array];

    for(let i = 0; i < arrV.length; i++){
      if(Array.isArray(arrV[i])){
        arrV.splice(i,1,...arrV[i]);
      }   
    }
    
    let idxV = selectorIndex([...array],0);

    arrV.splice(idxV,0,'_');

    setArrays([...array]);
    setArraysView([...arrV]);
    if(parAdd){
      pos++;
      idx[pos] = 0;
    }
    setIndexes([...idx]);
    setIndexesPositions(pos);
    
    let res = calcResult([...array]);
    setResult([...res]);
    
    console.log('idx: '+JSON.stringify(idx));
    console.log('pos: '+pos);
    console.log('array: '+JSON.stringify(array));
    console.log('arr: '+JSON.stringify(arr));
    console.log('arrV: '+JSON.stringify(arrV));
    console.log(arr[idx[pos]-1]+'  _  '+arr[idx[pos]]);
    //console.log('comprimento array atual: '+arr.length);
    console.log('\n');
  }

  const selectArray = (arr, p) => {
    if(p<pos){
      let arr2 = arr[idx[p]];
      arr = selectArray(arr2,p+1);
    }
    return arr;
  }

  const updateArray = (arr, val, p) => {
    if(p<pos)
      arr[idx[p]] = updateArray(arr[idx[p]],val,p+1);
    else
      arr = val;
    return arr;
  }

  const selectorIndex = (arr,p) => {
    let val = 0;
    for(let i = 0; i < idx[p]; i++){
      if(Array.isArray(arr[i]))
        val+= selectorIndexArray(arr[i]);
      else val++;
    }
    if(p<pos)
      val+= selectorIndex(arr[idx[p]],p+1);

    return val;
  }

  const selectorIndexArray = (arr) => {
    let val = 0;
    for(let i = 0; i < arr.length; i++){
      if(Array.isArray(arr[i]))
        val+= selectorIndexArray(arr[i]);
      else val++;
    }

    return val;
  }

  const calcNumbers = (arr) => {
    for(let i = 0; i < arr.length-1; i++){
      if(Array.isArray(arr[i]))
        arr[i] = calcResult(arr[i]);      
      else{
        if(!isNaN(parseInt(arr[i]))&&signsAll.includes(arr[i])){
          if(!isNaN(parseInt(arr[i+1]))&&signsAll.includes(arr[i+1])){
            arr.splice(i,2,arr[i]+''+arr[i+1]);
            i--;
          }
        }
      }
    }
    return arr;
  }

  const calcResult = (arr) => {
    arr = calcNumbers(arr);

    return arr;
  }

  const calcSign = (arr) => {

  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <LinearGradient colors={['rgba(255,255,255,0.3)', 'transparent']} style={{...styles.gradient,top:0}}/>  
      <View style={{width:'100%',height:'100%',position:'relative'}}>



        {/*painel*/}
        <View style={{width:'100%',height:'35%',padding:'7.5%',paddingBottom:0}}>
          <View style={{width:'100%',height:'100%',borderColor:'black',borderWidth:5,backgroundColor:'rgba(255,255,255,0.75)'}}>
            <View style={{flexDirection:'row',flexWrap:'wrap', padding:'3%',height:'100%',width:'100%'}}>
            {
              arraysView.map((val)=>{
                let col = 'black';
                let pd = 0;                
                if(val=='_')
                  col = 'red';
                else if(signsAll.includes(val))
                  pd = 5;
                return(
                  <Text style={{fontSize:30,color:col,paddingHorizontal:pd,textAlign:'center',textAlignVertical:'center'}}>{val}</Text>
                );
              })
            }
            </View>
          </View>
        </View>



        {/*barra de controle*/}
        <View style={{width:'94%',height:'8%',flexDirection:'row',alignItems:'center',marginHorizontal:'3%'}}>

          <TouchableOpacity onPress={()=>{calculator('left')}} style={{width:'30%',height:'100%',alignItems:'center',alignContent:'center'}}>
            <AntDesign name="arrowleft" size={40} color='black' style={{textAlignVertical:'center',textAlign:'center',width:'100%',height:'100%'}} />
          </TouchableOpacity>

          <TouchableOpacity style={{width:'40%',height:'75%',backgroundColor:'rgba(255,255,255,0.75)',...styles.btn}}>
            <Text>{result}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{calculator('right')}} style={{width:'30%',height:'100%',alignItems:'center'}}>
            <AntDesign name="arrowright" size={40} color='black' style={{textAlignVertical:'center',textAlign:'center',width:'100%',height:'100%'}} />
          </TouchableOpacity>

        </View>



        {/*área de botões*/}
        <View style={{width:'94%',height:'55%',borderColor:'rgba(0,0,0,0.5)',borderWidth:0.5,marginHorizontal:'3%',backgroundColor:'rgba(28, 130, 133,0.3)',borderRadius:5}}>
          <LinearGradient colors={['rgba(255,255,255,0.4)', 'transparent']} style={styles.gradient}/>

          {/*barra*/}
          <View style={{width:'100%',height:'14%',flexDirection:'row',padding:'1%',backgroundColor:'rgba(25, 59, 57,0.25)',borderRadius:5,borderBottomWidth:0.5}}>

            <View style={{width:'70%',height:'100%',flexDirection:'row'}}>

              <TouchableOpacity onPress={()=>{calculator('par')}} style={{width:'20%',marginVertical:'1.5%',marginLeft:'20%',backgroundColor: 'rgba(182, 227, 225,0.1)',...styles.btn,borderRadius:100}}>
                <LinearGradient colors={['rgba(255,255,255,0.2)', 'transparent']} style={styles.gradient}/>
                <Text style={{height:'100%',fontSize:20,textAlign:'center',textAlignVertical:'center'}}>{'( )'}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{width:'20%',marginVertical:'1.5%',marginLeft:'20%',backgroundColor: 'rgba(182, 227, 225,0.1)',...styles.btn,borderRadius:100}}>
                <LinearGradient colors={['rgba(255,255,255,0.2)', 'transparent']} style={styles.gradient}/>
                <Text style={{height:'100%',fontSize:20,textAlign:'center',textAlignVertical:'center'}}>{'√'}</Text>
              </TouchableOpacity>

            </View>

            <TouchableOpacity onPress={()=>{calculator('del')}}  onLongPress={()=>{calculator('delAll')}} style={{width:'30%',height:'100%',backgroundColor:'rgba(255,20,20,0.275)',...styles.btn}}>
              <LinearGradient colors={['rgba(255,255,255,0.2)', 'transparent']} style={styles.gradient}/>
              <Feather name="delete" size={28} color="black" style={{height:'100%',textAlign:'center',textAlignVertical:'center'}} />
            </TouchableOpacity>
          </View>

          {/*botões*/}
          <View style={{width:'100%',height:'86%',flexDirection:'row',flexWrap:'wrap',padding:'1%'}}>
            {buttonValues.map((val)=>{
              let rad = 100;
              let fs = 30;
              let bgCol = 'rgba(182, 227, 225,0.35)';
              if(signs.includes(val)||val=='='){
                rad = 10;
                fs = 40;
                bgCol = 'rgba(182, 227, 225,0.2)';
                fs = 30;
              }
              else if(val=='.')
                fs = 30;
              return(
                <TouchableOpacity onPress={()=>{calculator(val)}} style={{width:'22%',height:'22%',margin:'1.5%',backgroundColor: bgCol,...styles.btn,borderRadius:rad}}>
                  <Text style={{height:'100%',fontSize:fs,textAlign:'center',textAlignVertical:'center'}}>{val=='/'?'÷':val=='*'?'x':val}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>



      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'rgb(43, 105, 91)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn:{
    borderWidth:0.5,
    borderTopWidth:0.25,
    borderBottomWidth:1,
    borderRadius:5,
    overflow:'hidden'
  },
  gradient:{
    width:'100%',
    height:'100%',
    position:'absolute'
  }
});
