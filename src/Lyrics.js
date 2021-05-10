import React, { useEffect, useState } from 'react';

const Lyrics = () => {
    const [lyrics,setLyrics]= useState([])
    const [inputValue,setInputValue]=useState([])
    const [details,setDetails]=useState([])

  

    const handleBlure=(e)=>{
        setInputValue(e.target.name= e.target.value)
    }

const handleClick=()=>{
    fetch(`https://api.lyrics.ovh/suggest/${inputValue}`)
        .then(res=>res.json())
        .then(data=>{
            const tenData=data.data.slice(9)
            setLyrics(tenData)
        })
}

const handleDetails=(t,a)=>{
    // https://api.lyrics.ovh/v1/artist/title
    fetch(` https://api.lyrics.ovh/v1/"${a}"/"${t}"`)
        .then(res=>res.json())
        .then(data=>{
            setDetails(data)
        })
   
}
console.log(details);
    return (
        <div className="main">
            
          <div className="search-bar col-md-6 mx-auto">
          <h1 className="pt-5">Hard Rock Lyric Search</h1>
            <div className="search-box my-5">
                
                <input className="form-control" onBlur={(e)=>handleBlure(e) } name='lyricsName'   type="text" placeholder="Enter your artist song name" />
                <input className="btn btn-success search-btn" onClick={()=>handleClick()} type="submit" value="Search" />
            </div>
          </div>


        <div>
            
            <div>
                {lyrics&&
                    lyrics.map(item=>
                      
                    <div className='search-result col-md-8 mx-auto py-4'>
                       
                       <div className="single-result row align-items-center my-3 p-3">
                           <div className='col-md-9 text-left'>
                                <h3 className="lyrics-name">{item?.title}</h3>
                                <p className="author lead">Album by {item?.artist.name}</p>
                           </div>

                           <div className='col-md-3 text-md-right text-center'>
                              <button className="btn btn-success" onClick={()=>handleDetails(item.title,item.artist.name)}>Details</button>
                           </div>
                        </div>
                    </div>)
                }
                
               
            </div>
        </div>

            <div className="row justify-content-center">
                <div className="col-md-6 d-flex  ">
                    {
                        details&& 
                           <p>
                                {details?.lyrics}
                           </p>
                        
                    }

                 </div>
            </div>
        
        </div>
    );
};

export default Lyrics;