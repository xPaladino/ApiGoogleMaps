const fieldMapping = {
    Situacao: 'Situacao',
    Quantidade: 'Quantidade',
    Local: 'Local',
    Latitude: 'Latitude',
    Longitude: 'Longitude'
  };
  
  let markers = []; // Array para armazenar os marcadores criados
  const map = new google.maps.Map(document.getElementById('map'), {
    //center: { lat: -25.518936040648324, lng: -48.519404082340294 },
	//center : {lat: -25.529963013726864, lng: -48.52248696060405},
   // center: {lat: -25.533641841069173, lng: -48.522830283404055}, // baixo
	//center : {lat: -25.507529578888636, lng: -48.517408577179005},
	//center :{lat: -25.526423968931272, lng: -48.51711845726996},
	center: {lat: -25.52093343509099, lng: -48.515919800878315},
    zoom: 16
  });
  
  let infoWindows = []; // Array para armazenar as InfoWindows criadas
  
  // Função para criar e abrir a InfoWindow
  function createInfoWindow(marker, content, local) {
    const infoWindow = new google.maps.InfoWindow({
      content: content
    });
  
    if (local === "AZ 04") {
        // Definir a posição da InfoWindow à esquerda do marcador
        infoWindow.setPosition(marker.getPosition());
        const pixelOffset = new google.maps.Size(80, 35);
        infoWindow.setOptions({ pixelOffset: pixelOffset });
      }
/*
      if (local === "AZ 03") {
        // Definir a posição da InfoWindow à esquerda do marcador
        infoWindow.setPosition(marker.getPosition());
        const pixelOffset = new google.maps.Size(60, -435);
        infoWindow.setOptions({ pixelOffset: pixelOffset });
      }*/

    if (local === "AZ PRACA") {
        // Definir a posição da InfoWindow à esquerda do marcador
        infoWindow.setPosition(marker.getPosition());
        const pixelOffset = new google.maps.Size(80, 10);
        infoWindow.setOptions({ pixelOffset: pixelOffset });
      }  

    if (local === "AZ MARGARIDA") {
        // Definir a posição da InfoWindow à esquerda do marcador
        infoWindow.setPosition(marker.getPosition());
        const pixelOffset = new google.maps.Size(-80, -40);
        infoWindow.setOptions({ pixelOffset: pixelOffset });
      }  


    if (local === "AZ ELDORADO") {
      // Definir a posição da InfoWindow à esquerda do marcador
      infoWindow.setPosition(marker.getPosition());
      const pixelOffset = new google.maps.Size(-70, 10);
      infoWindow.setOptions({ pixelOffset: pixelOffset });
    }

    if (local === "AZ FIDELIDADE") {
        // Definir a posição da InfoWindow à esquerda do marcador
        infoWindow.setPosition(marker.getPosition());
        const pixelOffset = new google.maps.Size(60, 9);
        infoWindow.setOptions({ pixelOffset: pixelOffset });
      }

    if (local === "AZ SERTANEJA") {
        // Definir a posição da InfoWindow à esquerda do marcador
        infoWindow.setPosition(marker.getPosition());
        const pixelOffset = new google.maps.Size(-78, 35);
        infoWindow.setOptions({ pixelOffset: pixelOffset });
      }
  
    // Adicionar o evento de clique para abrir a InfoWindow
   // marker.addListener('click', () => {
      infoWindow.open(map, marker);
   // });
  
    infoWindows.push(infoWindow); // Adicionar a InfoWindow ao array
  }
  
  function addMarkers(resultados) {
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];
  
    infoWindows.forEach((infoWindow) => {
      infoWindow.close(); // Fechar as InfoWindows existentes
    });
    infoWindows.length = 0; // Limpar o array de InfoWindows
  
    let infoContentMap = {}; // Mapear as informações por local
  
    resultados.forEach((row) => {
      const marker = new google.maps.Marker({
        position: { lat: row.Latitude, lng: row.Longitude },
        map: map,
        title: `${row.Local} - Latitude: ${row.Latitude}, Longitude: ${row.Longitude}`
      });
  
      if (!infoContentMap[row.Local]) {
        infoContentMap[row.Local] = `
        <div style="font-size: 16px;">
        <strong>${row.Local}</strong> <br><br>
        </div>`;
      }
  
      infoContentMap[row.Local] += `
        <div style="font-size: 16px;">
         <strong>${row.Situacao}:${row.Quantidade}</strong><br><br>
        </div>
      `;
  
      markers.push(marker); // Adicionar o marcador ao array
    });
  
    // Criar e exibir as InfoWindows no mapa
    markers.forEach((marker) => {
      const local = marker.getTitle().split(' - ')[0];
      const infoContent = infoContentMap[local];
  
      createInfoWindow(marker, infoContent, local); // Passar o local para a função
    });
  
  }
  
  // Função para atualizar os dados e o conteúdo das InfoWindows
  async function atualizarInfoWindow() {
    try {
      // Obter as coordenadas do dispositivo do usuário
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
  
          // Fazer uma requisição ao servidor para obter os dados atualizados do banco de dados
          const response = await fetch(`/consultar?latitude=${lat}&longitude=${lng}`);
          const resultados = await response.json();
  
          console.log('1');
  
          // Atualizar o conteúdo das InfoWindows
          addMarkers(resultados);
        },
        (error) => {
          console.error('Erro ao obter as coordenadas:', error);
        }
      );
    } catch (error) {
      console.error('Erro ao atualizar informações:', error);
    }
  }
  


  // Fazer a requisição para obter os resultados com as coordenadas de latitude e longitude
  const urlParams = new URLSearchParams(window.location.search);
  const latitude = urlParams.get('latitude');
  const longitude = urlParams.get('longitude');
  
  // Exibir os resultados iniciais no mapa
  fetch(`/consultar?latitude=${latitude}&longitude=${longitude}`)
    .then((response) => response.json())
    .then((data) => {
      // Adicionar marcadores ao mapa
      addMarkers(data);
  
      // Atualizar o conteúdo das InfoWindows a cada 20 segundos
      setInterval(atualizarInfoWindow, 60000);
	  console.log('atualizou');
    })
    .catch((error) => console.error('Erro:', error));