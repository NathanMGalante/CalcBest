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

    let arr = selectArray([...arrays],0);//seleciona o array atual (caso o seletor esteja dentro de um parenteses)
    if(n=='sqr'){

    }
    else if(n=='par'){//se o botão for o de parenteses
      arr.splice(idx[pos],0,'(',[],')');//adiciona os parenteses e o array que contera os valores indernos do aprenteses.
      idx[pos]++;//seleciona o array do parenteses
      parAdd = true;//libera para que após salvar as modificações, o seletor entre dentro do array.
    }
    else if(n=='del'){//se o botão for o de deletar
      if(idx[pos]>0){//se a posição dentro do array for maior que zero...
        if(arr[idx[pos]-1]!=')'){//se o elemento anterior não for um parenteses...
          arr.splice(idx[pos]-1,1);//deleta o elemento anterior!
          idx[pos]--;//move o seletor para a esquerda!
        }
      }
    }
    else if(n=='delAll'){//se o botão for o de deletar tudo
      arr = [];//reseta o array principal
      arrV = [];//reseta o array mostrado na tela
      idx = [0];//reseta a posição do seletor
      pos = 0;//seleciona a posição para ser o array principal
    }
    else if(n=='left'){//se o botão for o de mover para a esquerda
      if(idx[pos]>0){//se a posição dentro do array for maior que zero...
        if(arr[idx[pos]-1]==')'){//se o elemento da esquerda for um parenteses...
          idx[pos]-=2;//seleciona o array do parenteses
          pos++;//seletor entra dentro do array
          arr = selectArray([...arrays],0);//seleciona o array atual
          idx[pos] = arr.length;//posição do seletor igual a ultima do array atual
        }
        else//se o elemento da esquerda NÃO for um parenteses...
          idx[pos]--;//move o seletor para a esquerda
      }
      else{//se a posição dentro do array for igual a zero...
        if(pos>0){//se o seletor estiver dentro de um parenteses...
          pos--;//o seletor sai de dentro do parenteses
          idx[pos]--;//seletor se move para a esquerda do parenteses
          idx.pop();//deleta o parenteses do array de posições
          arr = selectArray([...arrays],0);//seleciona o array atual
        }
      }
    }
    else if(n=='right'){//IGUAL O DA ESQUERDA, MAS AGORA PARA A DIREITA...
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
    else{//se o valor do botão for numérico ou de sinais...
      arr.splice(idx[pos],0,n);//adiciona o valor no local do seletor.
      idx[pos]++;//move o seletor para a frente.
    }
    
    

    let array = updateArray([...arrays],[...arr],0);//atualiza o array principal com as modificações feitas.

    arrV = [...array];//array mostrado na tela igual o array principal

    for(let i = 0; i < arrV.length; i++){//remove todos os arrays internos e deixa todos os elementos em apenas uma linha
      if(Array.isArray(arrV[i])){
        arrV.splice(i,1,...arrV[i]);
      }   
    }
    
    let idxV = selectorIndex([...array],0);//obtem o index em que o seletor deve ser posicionado.

    arrV.splice(idxV,0,'_');//posiciona o seletor dentro do array mostrado na tela

    setArrays([...array]);//salva o array principal
    setArraysView([...arrV]);//salva o array da tela
    if(parAdd){//se a ultima modificação foi a de criar um parenteses...
      pos++;//seletor entra dentro do array do parenteses
      idx[pos] = 0;//posição igual a zero
    }
    setIndexes([...idx]);//salva o array de posições
    setIndexesPositions(pos);//salva em qual array o seletor se encontra
    let arrR = [...array];
    let res = calcResult([...arrR]);//calcular os resultados
    setResult([...res]);//salvar resultado final
    
    //console.log('idx: '+JSON.stringify(idx));
    //console.log('pos: '+pos);
    //console.log('array: '+JSON.stringify(array));
    //console.log('arr: '+JSON.stringify(arr));
    //console.log('arrV: '+JSON.stringify(arrV));
    //console.log(arr[idx[pos]-1]+'  _  '+arr[idx[pos]]);
    //console.log('comprimento array atual: '+arr.length);
    //console.log('\n');
  }

  const selectArray = (arr, p) => {//função para selecionar o array atual
    if(p<pos){
      let arr2 = arr[idx[p]];
      arr = selectArray(arr2,p+1);
    }
    return arr;
  }

  const updateArray = (arr, val, p) => {//função para atualizar o array principal com as mosdificações feitas
    if(p<pos){
      let arr2 = arr[idx[p]];
      arr[idx[p]] = updateArray([...arr2],val,p+1);
    }
    else
      arr = val;
    return arr;
  }

  const selectorIndex = (arr,p) => {//função para contar em qual posição esta o seletor.
    let val = 0;
    let arr2;
    for(let i = 0; i < idx[p]; i++){
      if(Array.isArray(arr[i])){
        arr2 = arr[i];
        val+= selectorIndexArray([...arr2]);
      }
      else val++;
    }
    if(p<pos){
      arr2 = arr[idx[p]]
      val+= selectorIndex([...arr2],p+1);
    }

    return val;
  }

  const selectorIndexArray = (arr) => {//função para contar quantos elementos tem dentro de um array
    let val = 0;
    for(let i = 0; i < arr.length; i++){
      if(Array.isArray(arr[i])){
        let arr2 = arr[i];
        val+= selectorIndexArray([...arr2]);
      }
      else val++;
    }

    return val;
  }

  const calcNumbers = (arr) => {//função para juntar os elementos numericos visinhos em apenas um elemento
    for(let i = 0; i < arr.length-1; i++){
      if(Array.isArray(arr[i])){
        let arr2 = arr[i];
        arr[i] = calcNumbers([...arr2]);
      }
      else{
        if(!isNaN(parseInt(arr[i]))&&!signsAll.includes(arr[i])){
          if(!isNaN(parseInt(arr[i+1]))&&!signsAll.includes(arr[i+1])){
            arr.splice(i,2,arr[i]+''+arr[i+1]);
            i--;
          }
        }
      }
    }    
    return arr;
  }

  const calcResult = (arr) => {//função para calcular os resultados
    arr = calcNumbers(arr);
    //console.log('result Numb:'+JSON.stringify([...arr]));
    arr = calcPar(arr);
    //console.log('result Par:'+JSON.stringify([...arr]));
    arr = calcSigns(arr);
    //console.log('result Sign:'+JSON.stringify([...arr]));
    return arr;
  }

  const calcPar = (arr) => {//função para calcular dentro de todos os parenteses
    for(let i = 0; i < arr.length; i++){
      if(arr[i]=='('){
        let arr2 = arr[i+1];
        let arr3 = calcPar([...arr2]);        
        let valL = false;
        let valR = false;
        if(!signs.includes(arr[i-1])&&i>0)
          valL = true;
        if(!signs.includes(arr[i+3])&&i<arr.length-3)
          valR = true;
        if(valL&&valR)
          arr.splice(i,3,'*',...arr3,'*');
        else if(valL)
          arr.splice(i,3,'*',...arr3);
        else if(valR)
          arr.splice(i,3,...arr3,'*');
        else
          arr.splice(i,3,...arr3);
      }
    }
    arr = calcSigns(arr);
    return arr;
  }

  const calcSigns = (arr) => {//função para calcular envolvendo os sinais basicos
    for(let i = 1; i < arr.length-1; i++){
      if(arr[i]=='*'||arr[i]=='/'){
        if(!isNaN(parseFloat(arr[i-1]))&&!signsAll.includes(arr[i-1])){          
          if(!isNaN(parseFloat(arr[i+1]))&&!signsAll.includes(arr[i+1])){
            let val;
            if(arr[i]=='*')
              val = parseFloat(arr[i-1])*parseFloat(arr[i+1])
            else
              val = parseFloat(arr[i-1])/parseFloat(arr[i+1])
            arr.splice(i-1,3,val+'');
            i--;
          }
        }
      }
    }
    for(let i = 1; i < arr.length-1; i++){
      if(arr[i]=='+'||arr[i]=='-'){
        if(!isNaN(parseFloat(arr[i-1]))&&!signsAll.includes(arr[i-1])){          
          if(!isNaN(parseFloat(arr[i+1]))&&!signsAll.includes(arr[i+1])){
            let val;
            if(arr[i]=='+')
              val = parseFloat(arr[i-1])+parseFloat(arr[i+1])
            else
              val = parseFloat(arr[i-1])-parseFloat(arr[i+1])
            /*if(val<0){
              val*= -1;
              arr.splice(i-1,3,'-',val+'');
            }
            else*/
              arr.splice(i-1,3,val+'');
            i--;
          }
        }
      }
    }
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
            <Text style={{textAlign:'center',textAlignVertical:'center',height:'100%'}}>{result}</Text>
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
