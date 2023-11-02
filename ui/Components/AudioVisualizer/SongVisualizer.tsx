'use client'
import { useEffect, useRef } from 'react';

interface SongVisualizerProps {
  audioFile: string; // URL to the audio file
}

function SongVisualizer({ audioFile }: SongVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceStartedRef = useRef(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const audioContext = new AudioContext();
    audioContextRef.current = audioContext;

    const analyser = audioContext.createAnalyser();
    analyserRef.current = analyser;
    analyser.fftSize = 256;

    const canvasContext = canvas.getContext('2d');
    if (!canvasContext) return;

    const source = audioContext.createBufferSource();

    fetch(audioFile)
      .then((response) => response.arrayBuffer())
      .then((data) => audioContext.decodeAudioData(data))
      .then((buffer) => {
        source.buffer = buffer;
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        sourceStartedRef.current = true; // Mark source as started
        source.start(0);

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        function draw() {
          if (sourceStartedRef.current && canvasContext) {
            analyser.getByteTimeDomainData(dataArray);

            canvasContext.clearRect(0, 0, canvas.width, canvas.height);

            canvasContext.lineWidth = 2;
            canvasContext.strokeStyle = 'rgb(0, 0, 0)';
            canvasContext.beginPath();

            const sliceWidth = (canvas.width * 1.0) / bufferLength;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
              const v = dataArray[i] / 128.0;
              const y = (v * canvas.height) / 2;

              if (i === 0) {
                canvasContext.moveTo(x, y);
              } else {
                canvasContext.lineTo(x, y);
              }

              x += sliceWidth;
            }

            canvasContext.lineTo(canvas.width, canvas.height / 2);
            canvasContext.stroke();
          }

          requestAnimationFrame(draw);
        }

        draw();
      });

    return () => {
      if (sourceStartedRef.current) {
        source.stop();
        audioContext.close();
      }
    };
  }, [audioFile]);

  return (
    <div>
      <canvas ref={canvasRef} width={800} height={200} />
    </div>
  );
}

export default SongVisualizer;
