import { FlatList, SafeAreaView, StyleSheet,Text, TouchableOpacity } from 'react-native';
import {useEffect, useState} from 'react';


{/*
retrieve the data from api
show the name in a list
able to select multiple users
 */}

export default function App() {
  const url = "https://dummyapi.online/api/users";
  const [result, setResult] = useState([])
  const [isLoaded,setIsLoaded] = useState(false);
  const [isError,setIsError] = useState(false);
  const [nameList,setNameList] = useState([])
  const [selected,setSelected] = useState([])


  useEffect(()=> {
    fetch(url).then(res=> res.json()).then((resulto)=> {
     if(resulto.length) {
       setResult(resulto)
       setIsLoaded(true)
     } 
    },
    (error) => {
      setIsError(true)
      console.log('error',error)
    }
    )
  },[])

  useEffect(()=> {
    let list = [...result]
    list = list.map((obj) => {
      return obj.name
    })

    setNameList(list)
    setSelected(Array(list.length).fill(false))
 },[result])

 function selectedListPressed(index) {
   let se = [...selected]
   se[index] = !se[index]
   setSelected(se)
 }

   
  return (
    <SafeAreaView style={styles.container}>
    {isLoaded && <FlatList data={nameList} renderItem={({item,index})=> 
      <TouchableOpacity style={selected[index] ? styles.selected : styles.unselected} onPress={()=>selectedListPressed(index)}><Text>{item}</Text></TouchableOpacity>
    }/>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  selected: {
    backgroundColor: "rgba(255,0,0,0.3)"
  },
  unselected: {
    backgroundColor: "white"
  }
});
