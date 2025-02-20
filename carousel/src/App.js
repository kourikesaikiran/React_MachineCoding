import React,{useState} from "react";
import './App.css';

function App() {
  const [imageIndex,setImageIndex] = useState(0)
  const images = [
    "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg",
    "https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg",
    "https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg",
    "https://images.pexels.com/photos/270756/pexels-photo-270756.jpeg",
  ];

  const handlePrevClick = () => {
    if(imageIndex === 0){
        setImageIndex((prev) => images.length - 1)
    }else{
        setImageIndex((prev) => prev - 1)
    }
  }

  const handleNextClick = () => {
    if(imageIndex === images.length -1){
        setImageIndex((prev) => 0)
    }else{
        setImageIndex((prev) => prev + 1)
    }
  }

  return (
    <div className="App">
     <div className="componentContainer">
      <div className="imageContainer">
        <img src={images[imageIndex]} />
        <button onClick={handlePrevClick}>Prev</button>
        <button onClick={handleNextClick}>Next</button>
        <div className="textContainer">
          <span className="text">{`${imageIndex+1} of ${images.length}`}</span>
        </div>
      </div>
    </div>
      
    </div>
  );
}

export default App;
