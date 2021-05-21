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

  var arrV = [...arraysView];
  var idx = [...indexes];
  var pos = indexesPositions;

  const calculator = (n) => {
    let arr = selectArray([...arrays],0);

    if(n=='sqr'){

    }
    else if(n=='par'){

    }
    else if(n=='del'){

    }
    else if(n=='delAll'){

    }
    else if(n=='lefy'){

    }
    else if(n=='right'){

    }
    else{
      arr.splice(idx[pos],0,n);
      idx[pos]++;
    }

    let array = updateArray([...arrays],[...arr],0);

    arrV = [...array];

    arrV.splice(idx[pos],0,'_');

    setArrays([...array]);
    setArraysView([...arrV]);
    setIndexes([...idx]);
    setIndexesPositions(pos);

    console.log('numero anterior: '+arrV[idx[pos]-1]);
    console.log('index: '+JSON.stringify(idx));
    console.log('\n');
  }

  const selectArray = (arr,p) => {
    if(p<pos)
      arr = selectArray(arr[idx[p]],p+1);
    return arr;
  }

  const updateArray = (arr,val,p) => {
    if(p<pos)
      arr[idx[p]] = selectArray(arr[idx[p]],val,p+1);
    arr = val;
    return arr;
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
                if(val=='_')
                  col = 'red';
                return(
                  <Text style={{fontSize:30,color:col, textAlign:'center',textAlignVertical:'center'}}>{val}</Text>
                );
              })
            }
            </View>
          </View>
        </View>



        {/*barra de controle*/}
        <View style={{width:'94%',height:'8%',flexDirection:'row',alignItems:'center',marginHorizontal:'3%'}}>
          <TouchableOpacity style={{width:'30%',height:'100%',alignItems:'center',alignContent:'center'}}>
            <AntDesign name="arrowleft" size={40} color='black' style={{textAlignVertical:'center',textAlign:'center',width:'100%',height:'100%'}} />
          </TouchableOpacity>

          <TouchableOpacity style={{width:'40%',height:'75%',backgroundColor:'rgba(255,255,255,0.75)',...styles.btn}}>            
          </TouchableOpacity>

          <TouchableOpacity style={{width:'30%',height:'100%',alignItems:'center'}}>
            <AntDesign name="arrowright" size={40} color='black' style={{textAlignVertical:'center',textAlign:'center',width:'100%',height:'100%'}} />
          </TouchableOpacity>
        </View>



        {/*área de botões*/}
        <View style={{width:'94%',height:'55%',borderColor:'rgba(0,0,0,0.5)',borderWidth:0.5,marginHorizontal:'3%',backgroundColor:'rgba(28, 130, 133,0.3)',borderRadius:5}}>
          <LinearGradient colors={['rgba(255,255,255,0.4)', 'transparent']} style={styles.gradient}/>

          {/*barra*/}
          <View style={{width:'100%',height:'14%',flexDirection:'row',padding:'1%',backgroundColor:'rgba(25, 59, 57,0.25)',borderRadius:5,borderBottomWidth:0.5}}>

            <View style={{width:'70%',height:'100%',flexDirection:'row'}}>

              <TouchableOpacity style={{width:'20%',marginVertical:'1.5%',marginLeft:'20%',backgroundColor: 'rgba(182, 227, 225,0.1)',...styles.btn,borderRadius:100}}>
                <LinearGradient colors={['rgba(255,255,255,0.2)', 'transparent']} style={styles.gradient}/>
                <Text style={{height:'100%',fontSize:20,textAlign:'center',textAlignVertical:'center'}}>{'( )'}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{width:'20%',marginVertical:'1.5%',marginLeft:'20%',backgroundColor: 'rgba(182, 227, 225,0.1)',...styles.btn,borderRadius:100}}>
                <LinearGradient colors={['rgba(255,255,255,0.2)', 'transparent']} style={styles.gradient}/>
                <Text style={{height:'100%',fontSize:20,textAlign:'center',textAlignVertical:'center'}}>{'√'}</Text>
              </TouchableOpacity>

            </View>

            <TouchableOpacity style={{width:'30%',height:'100%',backgroundColor:'rgba(255,20,20,0.275)',...styles.btn}}>
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
