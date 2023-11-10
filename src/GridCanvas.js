import React, { useRef, useEffect } from 'react';

const GridCanvas = ({ grid, cellSize, onFrameRendered }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Function to draw the grid
        const drawGrid = () => {
            for (let row = 0; row < grid.length; row++) {
                for (let col = 0; col < grid[row].length; col++) {
                    context.fillStyle = grid[row][col] === 1 ? 'white' : 'black';
                    context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
                    context.strokeStyle = 'grey';
                    context.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
                }
            }
        };

        drawGrid();

        // Callback function after the frame is rendered
        if (onFrameRendered) {
            const dataUrl = canvas.toDataURL('image/png');
            onFrameRendered(dataUrl);
        }

    }, [grid, cellSize, onFrameRendered]);

    return <canvas ref={canvasRef} width={grid[0].length * cellSize} height={grid.length * cellSize} />;
};

// Function to repeat a grid sequence to fill the entire screen
export const repeatGridSequenceForScreen = (gridSequence, screenWidth, screenHeight, cellSize) => {
    // Determine the number of times the sequence needs to be repeated horizontally and vertically
    const gridWidth = gridSequence[0].length * cellSize;
    const gridHeight = gridSequence[0].length * cellSize; // Assuming square grids for simplicity
    const repeatHorizontally = Math.ceil(screenWidth / gridWidth);
    const repeatVertically = Math.ceil(screenHeight / gridHeight);
  
    // Function to concatenate two grids horizontally
    const concatenateHorizontally = (grid1, grid2) => grid1.map((row, index) => [...row, ...grid2[index]]);
  
    // Function to concatenate two grids vertically
    const concatenateVertically = (grid1, grid2) => [...grid1, ...grid2];
  
    // Repeat the grid sequence horizontally
    let horizontalRepeat = gridSequence.map(grid => {
      let repeatedGrid = grid;
      for (let i = 1; i < repeatHorizontally; i++) {
        repeatedGrid = concatenateHorizontally(repeatedGrid, grid);
      }
      return repeatedGrid;
    });
  
    // Repeat the grid sequence vertically
    let fullRepeat = [];
    for (let i = 0; i < repeatVertically; i++) {
      horizontalRepeat.forEach(grid => {
        if (fullRepeat.length === 0) {
          fullRepeat = [...grid];
        } else {
          fullRepeat = concatenateVertically(fullRepeat, grid);
        }
      });
    }
  
    return fullRepeat;
  };
  

export default GridCanvas;