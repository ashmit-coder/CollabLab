import { useEffect } from "react";
import "../App.css"
import { fabric } from "fabric";


export default function ToolArray(){
    let editor = new fabric.Canvas("Main-canvas")

    useEffect(()=>{
        editor = new fabric.Canvas("Main-canvas",{
            height:3000,
            width:3000,

        })

    },[])
    
    function addRect(){
        var rect = new fabric.Rect({
            stroke:"black",
            strokeWidth:2,
            width:100,
            height:100,
            fill:"white",
            selectable:true
        });

        editor.add(rect);
    }
    
    function addCircle(){
        var cir = new fabric.Circle({
            stroke:"black",
            strokeWidth:2,
            radius:100,
            fill:"white",
        })

        editor.add(cir);
    }

    function addTriangle(){
        var tri = new fabric.Triangle({
            stroke:"black",
            strokeWidth:2,
            fill:"white",
            width:100,
            height:100,
        })

        editor.add(tri);
    }

    function addText(){
        var text =  new  fabric.Textbox("TEXT")
        editor.add(text);
    }

    function deleteSelection(){
        let lst = editor.getActiveObjects()
        
        lst.forEach(element => {
           editor.remove(element); 
        }); 
    }

    function deleteAll(){
        editor.getObjects().forEach(element => {
            editor.remove(element);
        })
    }

    return(
        <div className="ToolArray">
            <button onClick={addRect}>Add Square</button>
            <button onClick={addCircle}>Add Circle</button>
            <button onClick={addTriangle}>Add Triangle</button>
            <button onClick={addText}>Add Textbox</button>
            <button onClick={deleteSelection}>Delete</button>
            <button onClick={deleteAll}>Delete All</button>
     
        </div>
    )

}