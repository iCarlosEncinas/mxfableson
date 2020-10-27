import React, { useState, useEffect } from "react";
import BarChart from "../componentes/BarChart.jsx";
import ComboBox2 from '../componentes/ComboBox2'
import ChartCharacteristics from '../data/ChartCharacteristics.json';
import ComboBox from '../componentes/ComboBox'

const DrawProtected = () => {

 
  function Area(ChartCharacteristics,data) {
    this.data=data;
    this.type=ChartCharacteristics[0]["type"];
    this.label=ChartCharacteristics[0]["label"];
    this.borderColor=ChartCharacteristics[0]["borderColor"];
    this.backgroundColor=ChartCharacteristics[0]["backgroundColor"];
    
  }
  const [state,setState]=useState({select: {
    GraficaType:'group',
    scenathon_id:'6',
    Iteration:'4',
   }});


  const [json,setJson]=useState([]);
 
  var data=null;




      useEffect(() => 
      {
      
        getProtectedAreaByType();
       
      },[state]);
    
      const getProtectedAreaByType = async() => {
        try {
          
          const body =state;
          
         const response = await fetch("http://localhost:5000/protected"+JSON.stringify(body));
         const  jsonAux =  await response.json();
      
        setJson(jsonAux);
       
    
        } catch (error) {
          console.error(error)
        }
    
    
    
      }

      const converter=()=>
      {

              
        var labels=[];
        var areaForest=[];
        var areaOther=[];
        var areaOtherNta=[];
        var areas=[];
        if (json != null) {
          json.map((item) => {
            if (!labels.includes(item.Year)) 
            {
              labels.push(item.Year);
            }

            areaForest.push(item.ProtectedAreasForest);
            areaOther.push(item.ProtectedAreasOther);
            areaOtherNta.push(item.ProtectedAreasOtherNat);

          });

 
          var area = new Area(ChartCharacteristics["ProtectedAreasForest"],areaForest);
          areas.push(area);
           area = new Area(ChartCharacteristics["ProtectedAreasOther"],areaOther);
          areas.push(area);
           area = new Area(ChartCharacteristics["ProtectedAreasOtherNat"],areaOtherNta);
          areas.push(area);

         var dataAux = {
            labels:labels,
            datasets:areas
        };
        data=dataAux;
      }
    }
  
     const handleChange = e => {
var graficaType = state.select.GraficaType;
var scenathon = state.select.scenathon_id;
var iteration = state.select.Iteration;

      if(e.target.name=="scenathon_id"){
        switch (e.target.value) {
          case '6':
           
            iteration=state.select.Iteration=="1"? "3":"4";
            scenathon="6";
              break;
          case '5':
           scenathon="5";
         
           iteration=state.select.Iteration=="3"? "1":"2";
              break;     
      }
      }else{
       
        graficaType= e.target.name=="GraficaType"? e.target.value: state.select.GraficaType;
        iteration=e.target.name=="Iteration"?scenathon=="6" ? e.target.value==="after"? "4":"3" : e.target.value==="after"? "2":"1":state.select.Iteration;
      }
     
        setState({
            select: {
              GraficaType: graficaType,
              scenathon_id:scenathon,
              Iteration:iteration,
       
              }

           
        });
        

        
    }
 

    return (
    <div>
      
      <ComboBox onChange={handleChange}/>
     {converter()}
      

      <BarChart data={data}
    title="Protected Areas By Type"/>
    
    </div>
    )
  }

  export default DrawProtected;