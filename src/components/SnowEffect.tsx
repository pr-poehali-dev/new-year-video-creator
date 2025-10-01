import { useEffect } from 'react';

const SnowEffect = () => {
  useEffect(() => {
    const createSnowflake = () => {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.innerHTML = '❄';
      snowflake.style.left = Math.random() * 100 + 'vw';
      snowflake.style.animationDuration = Math.random() * 3 + 5 + 's';
      snowflake.style.fontSize = Math.random() * 1 + 0.5 + 'em';
      snowflake.style.opacity = String(Math.random() * 0.6 + 0.3);
      document.body.appendChild(snowflake);

      setTimeout(() => {
        snowflake.remove();
      }, 8000);
    };

    const interval = setInterval(createSnowflake, 200);
    
    return () => clearInterval(interval);
  }, []);

  return null;
};

export default SnowEffect;
