import { useEffect } from "react";
import { Button, Card } from "react-bootstrap"
import { useParams } from 'react-router-dom';

export default function Date (){
    const params = useParams();
    const paramData = params.id;
        // const date = new Date(paramData);
        // // console.log(date)




    return (
        <>
        <Card>
        <Card.Title></Card.Title>
      <Button >+ New Task</Button>
   

    </Card>       
        </>
    )
}