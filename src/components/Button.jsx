

export default function Button(props){
    const {text,...other} = props ;
    return (
        <button {...other}>
            {text}
        </button>
    ) ;
}


