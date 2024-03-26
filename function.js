window.function = function (
  html,
  fileName,
  format,
  zoom,
  orientation,
  margin,
  breakBefore,
  breakAfter,
  breakAvoid,
  fidelity,
  customDimensions
) {
  // FIDELITY MAPPING
  const fidelityMap = {
    low: 1,
    standard: 1.5,
    high: 2
  };

  // DYNAMIC VALUES
  html = html.value ?? "No HTML set.";
  fileName = fileName.value ?? "file";
  format = format.value ?? "a4";
  zoom = zoom.value ?? "1";
  orientation = orientation.value ?? "portrait";
  margin = margin.value ?? "0";
  breakBefore = breakBefore.value ? breakBefore.value.split(",") : [];
  breakAfter = breakAfter.value ? breakAfter.value.split(",") : [];
  breakAvoid = breakAvoid.value ? breakAvoid.value.split(",") : [];
  quality = fidelityMap[fidelity.value] ?? 1.5;
  customDimensions = customDimensions.value
    ? customDimensions.value.split(",").map(Number)
    : null;

  // DOCUMENT DIMENSIONS
  const formatDimensions = {
    a0: [4967, 7022],
    a1: [3508, 4967],
    a2: [2480, 3508],
    a3: [1754, 2480],
    a4: [1240, 1754],
    a5: [874, 1240],
    a6: [620, 874],
    a7: [437, 620],
    a8: [307, 437],
    a9: [219, 307],
    a10: [154, 219],
    b0: [5906, 8350],
    b1: [4175, 5906],
    b2: [2953, 4175],
    b3: [2085, 2953],
    b4: [1476, 2085],
    b5: [1039, 1476],
    b6: [738, 1039],
    b7: [520, 738],
    b8: [366, 520],
    b9: [260, 366],
    b10: [183, 260],
    c0: [5415, 7659],
    c1: [3827, 5415],
    c2: [2705, 3827],
    c3: [1913, 2705],
    c4: [1352, 1913],
    c5: [957, 1352],
    c6: [673, 957],
    c7: [478, 673],
    c8: [337, 478],
    c9: [236, 337],
    c10: [165, 236],
    dl: [650, 1299],
    letter: [1276, 1648],
    government_letter: [1199, 1577],
    legal: [1276, 2102],
    junior_legal: [1199, 750],
    ledger: [2551, 1648],
    tabloid: [1648, 2551],
    credit_card: [319, 508]
  };

  // GET FINAL DIMESIONS FROM SELECTED FORMAT
  const dimensions = customDimensions || formatDimensions[format];
  const finalDimensions = dimensions.map((dimension) =>
    Math.round(dimension / zoom)
  );

  // LOG SETTINGS TO CONSOLE
  console.log(
    `Filename: ${fileName}\n` +
      `Format: ${format}\n` +
      `Dimensions: ${dimensions}\n` +
      `Zoom: ${zoom}\n` +
      `Final Dimensions: ${finalDimensions}\n` +
      `Orientation: ${orientation}\n` +
      `Margin: ${margin}\n` +
      `Break before: ${breakBefore}\n` +
      `Break after: ${breakAfter}\n` +
      `Break avoid: ${breakAvoid}\n` +
      `Quality: ${quality}`
  );

  const customCSS = `
    body {
      margin: 0!important;
    }
    header {
      margin-bottom: 40px;
    }
    button#download {
      position: fixed;
      top: 8px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 0.5rem;
      padding: 8px 16px;
      background-color: #23c1da;
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      line-height: 1.5rem;
      border: none;
      font-family: 'Open Sans';
      height: 40px;
      width: 50%;
      cursor: pointer;
    }
    button#download:hover {
      background-color: #19a5bb;
    }
    ::-webkit-scrollbar {
      width: 5px;
      background-color: rgb(0 0 0 / 8%);
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgb(0 0 0 / 32%);
      border-radius: 4px;
    }
    `;

    const originalHTML = `
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script>
    <style>${customCSS}</style>
    <div class="main">
        <button class="button" id="download">Descargar</button>
    </div>
    <script>
    document.getElementById('download').addEventListener('click', function() {
        var element = document.createElement('div');
        element.id = 'content';
        element.innerHTML = \`${html}\`; // Insert dynamic HTML content here
        document.body.appendChild(element); // Add to DOM
        
        setTimeout(() => {
            var opt = {
                margin: ${JSON.stringify(margin)},
                filename: '${fileName}',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: ${quality}, logging: true, dpi: 192, letterRendering: true },
                jsPDF: { unit: 'pt', format: 'a4', orientation: '${orientation}' }
            };
            
            html2pdf().set(opt).from(element).toPdf().get('pdf').then(function(pdf) {
                document.body.removeChild(element); // Remove after download
            }).save();
        }, 100); // Delay to ensure rendering
    });
    </script>
    `;

    var encodedHtml = encodeURIComponent(originalHTML);
    return "data:text/html;charset=utf-8," + encodedHtml;
};
