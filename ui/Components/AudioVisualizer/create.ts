'use client'
export const createAudioWaveform = (source, canvas) => {
    console.log('pop create')
    const audioCtx = new AudioContext();
  
    const canvasCtx = canvas.getContext('2d');
    canvas.width = 500; // Adjust canvas size as needed
    canvas.height = 100; // Adjust canvas size as needed
  
    const analyser = audioCtx.createAnalyser();
 
  
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
  
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
  
    const draw = () => {
      analyser.getByteFrequencyData(dataArray);
  
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  
      const barWidth = (canvas.width / bufferLength) * 2;
      let x = 0;
  
      dataArray.forEach((value) => {
        const barHeight = (value / 256) * canvas.height;
  
        canvasCtx.fillStyle = `rgb(0, ${barHeight}, 0)`;
        canvasCtx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);
  
        x += barWidth;
      });
  
      requestAnimationFrame(draw);
    };
  
   // audioElement.play();
    draw();
  };