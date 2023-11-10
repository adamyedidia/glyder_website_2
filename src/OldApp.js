import React, { useEffect } from 'react';

import logo from './logo.svg';
import './App.css';
import GridCanvas, {repeatGridSequenceForScreen} from './GridCanvas';

function App() {
  // Function to create an empty 3x3 grid
  const createEmptyGrid = () => Array.from({ length: 3 }, () => Array(3).fill(0));

  // Function to concatenate a 3x3 grid with empty grids to form a 12x12 grid
  const createFullGrid = (smallGrid, vertOffset, horizOffset) => {
    // Create an empty 12x12 grid
    let fullGrid = Array.from({ length: 6 }, () => Array(6).fill(0));

    // // Place the 3x3 grid in the upper-left corner of the 12x12 grid
    // for (let row = 0; row < smallGrid.length; row++) {
    //   for (let col = 0; col < smallGrid[row].length; col++) {
    //     fullGrid[(row + vertOffset) % 6][(col + horizOffset) % 6] = smallGrid[row][col];
    //   }
    // }

    return fullGrid;
  };

  // const preloadImages = () => {
  //   for (let i = 0; i < 24; i++) {
  //     const img = new Image();
  //     img.src = `./images/frame_${i}.png`;
  //   }
  // };
  
  // const preloadImages2 = () => {
  //   const container = document.createElement('div');
  //   container.style.display = 'none'; // Hide the container
  
  //   document.body.appendChild(container);
  
  //   for (let i = 0; i < 24; i++) {
  //     const img = new Image();
  //     img.src = `/images/frame_${i}.png`;
  //     container.appendChild(img); // Append to the DOM
  //   }
  // };

  // // Call this function when your component mounts
  // useEffect(() => {
  //   preloadImages();
  //   preloadImages2();
  // }, [])

  const preloadImages = () => {
    let images = [];
    let loadedCount = 0;
    const totalImages = 24;
  
    return new Promise((resolve) => {
      for (let i = 0; i < totalImages; i++) {
        const img = new Image();
        fetch(`/images/frame_${i}.png`)
          .then(response => response.blob())
          .then(blob => {
            const blobUrl = URL.createObjectURL(blob);
            img.onload = () => {
              loadedCount++;
              if (loadedCount === totalImages) {
                resolve(images); // Resolve when all images are loaded
              }
            };
            img.src = blobUrl;
            images.push(img);
          });
      }
    });
  };

  const displayImagesInSequence = () => {
    let currentImageIndex = 0;
  
    const changeImage = () => {
      fetch(`/images/frame_${currentImageIndex}.png`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.blob();
        })
        .then(blob => {
          const blobUrl = URL.createObjectURL(blob);

          console.log('blobUrl', blobUrl)
          // document.body.style.backgroundImage = `url('${blobUrl}')`;
          // URL.revokeObjectURL(blobUrl); // Release memory once the image is loaded
          currentImageIndex = (currentImageIndex + 1) % 24;
          setTimeout(changeImage, 333);
        })
        .catch(error => {
          console.error('Error fetching image:', error);
        });
    };
    
    // Start the sequence
    changeImage();
  };

  const preloadAndAnimateImages = () => {
    console.log('Doing it!')
    let images = [];
    let currentImageIndex = 0;
    const changeImage = () => {
      document.body.style.backgroundImage = `url('/images/frame_${currentImageIndex}.png')`;
      currentImageIndex = (currentImageIndex + 1) % 24;
    };
  
    for (let i = 0; i < 24; i++) {
      const img = new Image();
      console.log('Hello!')
      img.onload = () => {
        console.log('Loaded!')
        images[i] = img;
        if (images.length === 24) {
          setInterval(changeImage, 333); // Change image every 1/3rd of a second
        }
      };
      img.src = `/images/frame_${i}.png`;
    }
  };
  
  // useEffect(() => {
  //   preloadAndAnimateImages();
  // }, []);

  useEffect(() => {
    displayImagesInSequence();
  }, []);

  const handleFrameRendered = (dataUrl, frameIndex) => {
    // Create a link and set the URL
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `frame_${frameIndex}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  // Function to generate a sequence of full grids based on the frames of the glider
  const generateGridSequence = (gridFrames, vertOffset, horizOffset) => {
    return gridFrames.map(frame => createFullGrid(frame, vertOffset, horizOffset));
  };

  const gridFrames = [
    [
      [0, 1, 0],
      [0, 0, 1],
      [1, 1, 1],
    ],
    [
      [1, 0, 1],
      [0, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 0, 1],
      [1, 0, 1],
      [0, 1, 1],
    ],
    [
      [1, 0, 0],
      [0, 1, 1],
      [1, 1, 0],
    ],
  ];

  const n = 0

  // Generate the sequence of full 12x12 grids
  // const fullGridSequence = generateGridSequence(gridFrames, n+1, n+1);
  const fullGridSequence = generateGridSequence(gridFrames, 1, 1);

  // return <GridCanvas grid={fullGridSequence[0]} cellSize={100} lineWidth={5} onFrameRendered={(dataUrl) => handleFrameRendered(dataUrl, 4*n)}/>;
  // return <div id="preload-images"></div>;
  return (
    <div>
      <img id="preload-img" style={{ display: 'none' }} alt="preload" />
      {/* other content */}
    </div>
  )
}

// export default App;
