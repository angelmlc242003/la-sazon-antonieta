import { useEffect, useRef, useState } from "react";
import "./galeria.css";

const Galeria = () => {
  const trackRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Configuración de posiciones personalizadas (se mantiene tu lógica)
  const ajustesPosicion = {
    // 1: "top", 
    // 3: "50% 20%",
  };

  const TOTAL_IMAGENES = 10;
  const slides = Array.from({ length: TOTAL_IMAGENES }, (_, i) => {
    const id = i + 1;
    return {
      id: id,
      src: `/assets/img/galeria${id}.jpeg`, 
      alt: `Experiencia gastronómica ${id}`,
      position: ajustesPosicion[id] || "center"
    };
  });

  const totalSlides = slides.length;

  const moveSlide = (direction) => {
    setCurrentSlide((prev) => {
      let next = prev + direction;
      if (next < 0) return totalSlides - 1;
      if (next >= totalSlides) return 0;
      return next;
    });
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Lógica de Autoplay (ajustada a 4 segundos para estilo premium)
  useEffect(() => {
    const intervalo = setInterval(() => {
      moveSlide(1);
    }, 3000); 

    return () => clearInterval(intervalo);
  }, [currentSlide]);

  // Efecto visual de movimiento
  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }, [currentSlide]);

  return (
    <section className="carousel-section" id="galeria">
      <div className="carousel-header">
        <h2 className="carousel-title">Galería</h2>
        <p className="carousel-subtitle">~ Descubre nuestro ambiente ~</p>
      </div>

      <div className="carousel-container">
        {/* 2. WRAPPER PARA EL MARCO EXTERNO */}
        <div className="carousel-wrapper">
          <div className="carousel">
            
            {/* 3. CONTADOR DINÁMICO */}
            <div className="carousel-counter">
              <span className="current">{currentSlide + 1}</span> / {totalSlides}
            </div>

            <div className="carousel-track" ref={trackRef}>
              {slides.map((item) => (
                <div className="carousel-slide" key={item.id}>
                  <img 
                    src={item.src} 
                    alt={item.alt} 
                    className="carousel-image"
                    style={{ objectPosition: item.position }}
                    loading="lazy" 
                  />
                </div>
              ))}
            </div>

            <button className="carousel-button carousel-button-prev" onClick={() => moveSlide(-1)}>❮</button>
            <button className="carousel-button carousel-button-next" onClick={() => moveSlide(1)}>❯</button>
          </div>

          <div className="carousel-indicators-wrapper">
            <div className="carousel-indicators">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`carousel-dot ${index === currentSlide ? "active" : ""}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Galeria;