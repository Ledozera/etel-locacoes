export default async function handler(req, res) {
  const bubbleUrl = process.env.BUBBLE_API_URL || 'https://financeiro-etel-89910.bubbleapps.io/version-test/api/1.1/obj/veiculos';

  const { constraints, bubble_id } = req.query;
  
  let finalUrl = bubbleUrl;
  if (bubble_id) {
    finalUrl = `${bubbleUrl}/${bubble_id}`;
  } else if (constraints) {
    finalUrl = `${bubbleUrl}?constraints=${encodeURIComponent(constraints)}`;
  }

  try {
    const response = await fetch(finalUrl);
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Erro no Bubble API' });
    }
    let data = await response.json();

    // Sanitiza o payload para proteger informações de placa/chassi sensíveis de inspeção
    if (data && data.response) {
      if (Array.isArray(data.response.results)) {
        data.response.results.forEach(item => {
          delete item.Placa;
          delete item.placa;
          delete item.PLACA;
        });
      } else {
        delete data.response.Placa;
        delete data.response.placa;
        delete data.response.PLACA;
      }
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Serverless fetch error:', error);
    return res.status(500).json({ error: 'Erro ao comunicar com backend' });
  }
}
