import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [files, setFiles] = useState(null)
  const [file, setFile] = useState(null)
  const [state, setState] = useState(0)
  const [fetchedFiles, setFetchedFiles] = useState([])
  const [state2, setState2] = useState(false)
  const [singleFile, setSingleFile] = useState()
  const [dogImg, setDogImg]=useState()

  const uploadSingle = async () => {
    const formData = new FormData()
    formData.append("file", file);
    try {
      const response = await fetch("http://localhost:8000/save/single", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      alert(data.message);
      setFile(null)
    } catch (error) {
      console.error("Error uploading single file:", error);
    }

  }

  const uploadMultiple = async () => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    try {
      const response = await fetch("http://localhost:8000/save/multiple", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      alert(data.message);
      setFiles([])
    } catch (error) {
      console.error("Error uploading single file:", error);
    }
  };

  // fetch files
  const getSingleImg = async () => {
    try {
      const response = await fetch("http://localhost:8000/fetch/single");
      const file = await response.json();
      const base64URL = `data:application/octet-stream;base64,${file.data}`
      let info = {
        filename: file.filename,
        url: base64URL,
      };
      setSingleFile(info)
      setFetchedFiles([])
      setState(1)
    } catch (error) {
      console.error("Error fetching single file:", error);
    }
  };

  const getAllImages = async () => {
    try {
      const response = await fetch("http://localhost:8000/fetch/all")
      const data = await response.json();

      const fileData = data.files.map((file) => {
        const base64URL = `data:application/octet-stream;base64,${file.data}`
        return {
          filename: file.filename,
          url: base64URL,
        };
      });
      setFetchedFiles(fileData);
      setSingleFile()
      setState(3)

    } catch (error) {
      console.error("Error fetching multiple files:", error);
    }
  }

  const getMultipleImages = async () => {
    try {
      const response = await fetch("http://localhost:8000/fetch/multiple")
      const data = await response.json();

      const fileData = data.files.map((file) => {
        const base64URL = `data:application/octet-stream;base64,${file.data}`
        return {
          filename: file.filename,
          url: base64URL,
        };
      });
      setFetchedFiles(fileData);
      setSingleFile()
      setState(2)
    } catch (error) {
      console.error("Error fetching multiple files:", error);
    }
  }

  const saveDogImage = async ()=>{
    try {
      const res = await fetch(dogImg);
    const blob = await res.blob();
      const formData = new FormData()
      formData.append("file", blob, "dog.jpg")
      const response = await fetch("http://localhost:8000/save/single", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      alert(data.message);
      if(state){
        getAllImages()
      }
    } catch (error) {
      console.error("Error uploading single file:", error);
    }
  }

  const getDogImg = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDogImg(data.message);
      console.log(data.message)
      setState2(true)
      
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    // getDogImg()
  }, [])

  return (
    <div className='p-5 h-auto bg-[#dad7cd]'>
      <h2 className='text-4xl m-6 font-bold text-[#588157]'>Co.-Doc</h2>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5'>
        <div className='flex flex-col gap-2 bg-[#a3b18a] rounded-lg p-5 shadow-xl'>
          <h2 className='text-lg text-[#344e41] font-bold'>Upload Single File</h2>
          <input type="file" name="File" onChange={(e) => setFile(e.target.files[0])} />
          <button className='p-2 rounded-lg bg-[#588157]' onClick={() => uploadSingle()}>Upload Single File</button>
        </div>
        <div className='flex flex-col gap-2 bg-[#a3b18a] rounded-lg p-5 shadow-xl'>
          <h2 className='text-lg text-[#344e41] font-bold'>Upload Multiple Files</h2>
          <input multiple type="file" name='File' onChange={(e) => setFiles(e.target.files)} className='' />
          <button className='p-2 rounded-lg bg-[#588157]' onClick={()=> uploadMultiple()}>Upload Files</button>
        </div>
        <div className='flex flex-col justify-between bg-[#a3b18a] rounded-lg p-5 shadow-xl'>
          <h2 className='text-lg text-[#344e41] font-bold'>Generate Random Dog Image</h2>
          <button className='p-2 rounded-lg duration-2000 hover:font-bold bg-[#588157]' onClick={()=>getDogImg()}>Generate</button>
         
        </div>
      </div>
      <div className='flex items-center justify-start'>
        {state2? <div className='mt-10 w-[500px] flex flex-col items-center justify-center gap-5 bg-[#a3b18a] rounded-lg p-5 shadow-xl'>
        <img className="w-[300px] h-[300px] rounded-lg object-cover" src={dogImg}/>
        <h2 className='text-lg text-[#344e41]'>{dogImg}</h2>
        <button className='p-2 w-full rounded-lg duration-2000 hover:font-bold bg-[#588157]' onClick={()=>saveDogImage()}>Upload Image</button>
        <button className='p-2 w-full rounded-lg duration-2000 hover:font-bold bg-[#588157]' onClick={()=>setState2(false)}>Close</button>
        </div> : null}
      </div>
      
      <div className='mt-10 bg-[#a3b18a] rounded-lg p-5 shadow-xl'>
        <div className='flex items-center justify-center gap-5 p-5'>
          <button onClick={() => getAllImages()} className={`bg-[#588157] ${state==3? 'font-bold' : ""} hover:font-bold duration-2000 rounded-lg p-2`}>Get all images </button>
          <button onClick={() => getSingleImg()} className={`bg-[#588157] ${state==1? 'font-bold' : ""} hover:font-bold duration-2000 rounded-lg p-2`}>Get a random image </button>
          <button onClick={() => getMultipleImages()} className={`bg-[#588157] ${state==2? 'font-bold' : ""} hover:font-bold duration-2000 rounded-lg p-2`}>Get multiple random images </button>
        </div>
        {fetchedFiles && (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
            {fetchedFiles.map((file, index) => (
              <div key={index} className=' p-2'>

                <img className='rounded-lg h-[300px] w-[500px] object-cover '

                  src={file.url}
                  alt={file.filename}
                />
                <p className='font-bold'>{file.filename}</p>
              </div>
            ))}
          </div>
        )}
        {singleFile && (
          <div className=' p-2 flex items-center justify-center flex-col gap-5'>

            <img className='rounded-lg h-[300px] w-[500px] object-cover '

              src={singleFile.url}
              alt={singleFile.filename}
            />
            <p className='font-bold'>{singleFile.filename}</p>
          </div>
        )}
      </div>
    </div>

  )
}

export default App
