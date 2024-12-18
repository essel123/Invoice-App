import Button from "./components/Button/Button";

function App() {
  return  (
    <>
<Button children = {"New Invoice"}  icon="../public/assets/add.png" radius="full" bgColor="primary"  size="lg" onClick={()=>alert('deleted')} />
    
    </>
  )

  

 
}

export default App;
