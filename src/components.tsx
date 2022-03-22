import './index.scss';
import _ from "lodash";
import { useState } from 'react';

interface DateProps {
    readonly date: Date;
};


const DateComponent: React.FunctionComponent<DateProps> = (props) => {
    console.log("[DateComponent] execution()");
    const currentDate = props.date.toString();
    return <div className='Date'>
        Data e ora attuali: {currentDate}
    </div>;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

interface Post {
    readonly Titolo: string; 
    readonly Autore: string; 
    readonly Descrizione: string;
}


const Posts: Post[] = [
    {
        Titolo : "Titolo 1",
        Autore : " Autore 1",
        Descrizione : "Descrizione 1",
    },

    {
        Titolo : "Titolo 2",
        Autore : "Autore 2",
        Descrizione : "Descrizione 2",
    },

    {
        Titolo : "Titolo 3",
        Autore : "Autore 3",
        Descrizione : "Descrizione 3",
    },

]

//Interfaccia che forma le props dei nostri Post
interface PostComponenstsProps {
    readonly post: Post;
}
export const PostComponensts: React.FunctionComponent<PostComponenstsProps> = (props) => {
    return (
        <div className = 'PostList'>
            <div>Titolo: {props.post.Titolo}</div>
            <div>Autore: {props.post.Autore}</div>
            <div>Descrizione: {props.post.Descrizione}</div>
        </div>
    );
};

//Interfaccia che conta quanti post abbiamo
interface PostStatsProps {
    listaDiPost: Post[];
}
export const PostStatsComponent : React.FunctionComponent<PostStatsProps> = (props) => {
    const {listaDiPost} = props;
    return <div className="PostList">
        Numero di Post: {listaDiPost.length}
    </div>
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

interface CounterProps {
    readonly initialValue: number;
    readonly name: string;
    readonly callback: (value: number) => void;
    // readonly callback: CallbackFunction;

}
export const CounterComponent: React.FunctionComponent<CounterProps> = (props) => {
    const { initialValue, name, callback } = props;

    const clickHandler = (newValue: number) => {
        setValue(newValue);
        callback(newValue);
    };

    // Stato
    const [value, setValue] = useState(initialValue);
    return <div className="PostList2">
        <h4>{name}</h4>
        Value: {value}
        <button className='btn' onClick={() => { clickHandler(value + 1); }}>Inc</button>
        <button className='btn' onClick={() => { clickHandler(value - 1); }}>Dec</button>
        <button className='btn' onClick={() => { clickHandler(initialValue); }}>Reset</button>
    </div>;
};

interface ButtonProps{
    readonly text: string;
}

  export const ButtonComponent: React.FC<ButtonProps>=(props)=>{
    const {text}=props;
    return <div className="btn2">
      <h3>{text}</h3>
      <button className="btn" onClick={()=>{ alert('Cosa Combini'); }}>This One</button>
      <button className="btn" onClick={()=>{console.log("Ciao sono il console log del bottone")}}>Another One</button>
    </div>
  }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const App: React.FunctionComponent = () => {
    /**
     * Questo componente HA uno stato, "date", di tipo Date
     * Per modificare questo stato, devo usare la funzione setDate
     * Il suo valore iniziale è new Date()
     */
    const initialValue = 0;
    const initialValue2 = 200;
    const [date, setDate] = useState(new Date());
    const [tempValue, setTempValue] = useState(initialValue);
    const [tempValue2, setTempValue2] = useState(initialValue2);

    // let date = new Date();
    return <div>

        <div className="Date">
            <DateComponent date={date} />
            <button onClick={() => {
                console.log("onClick del bottone!");
                setDate(new Date());
            }} className="Date">Refresh date</button>
        </div>

        {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

        <div className="">
            {Posts.map((post, index) => {
                return <PostComponensts key={index} post={post} />;
            })}
            <PostStatsComponent listaDiPost={Posts} />
        </div>

        {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

        <CounterComponent
            name={"Contatore 1"}
            initialValue={initialValue}
            callback={(value) => {
                console.log(value);
                setTempValue(value);
            }}
        />
        
        <CounterComponent
            name={"Contatore 2"}
            initialValue={initialValue2}
            callback={(value) => {
                console.log(value);
                setTempValue2(value);
                <div>Il valore del contatore 2 è {tempValue2}</div>
            }}
        />

        {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

        <div className='PostList2'>Il valore del contatore 1 è {tempValue}</div>
        <div className='PostList2'>Il valore del contatore 2 è {tempValue2}</div>
        
        <ButtonComponent text={"Press Here"} />
    </div>;
};