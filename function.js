window.function = function (html, fileName, format, zoom, orientation, margin, breakBefore, breakAfter, breakAvoid, fidelity, customDimensions) {
    // FIDELITY MAPPING
    const fidelityMap = {
        low: 1,
        standard: 1.5,
        high: 2,
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
    customDimensions = customDimensions.value ? customDimensions.value.split(",").map(Number) : null;

    // DOCUMENT DIMENSIONS
    const formatDimensions = {
        // Formats dimensions as before...
    };

    // GET FINAL DIMENSIONS FROM SELECTED FORMAT
    const dimensions = customDimensions || formatDimensions[format];
    const finalDimensions = dimensions.map((dimension) => Math.round(dimension / zoom));

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
  
    button#download {
      align-items: center;
      background-color: rgb(35, 193, 218);
      border-bottom-color: rgb(255, 255, 255);
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      border-bottom-style: solid;
      border-bottom-width: 0px;
      border-left-color: rgb(255, 255, 255);
      border-left-style: solid;
      border-left-width: 0px;
      border-right-color: rgb(255, 255, 255);
      border-right-style: solid;
      border-right-width: 0px;
      border-top-color: rgb(255, 255, 255);
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      border-top-style: solid;
      border-top-width: 0px;
      box-sizing: border-box;
      color: rgb(255, 255, 255);
      column-gap: 6px;
      cursor: pointer;
      display: block; // Changed from 'none' to 'block'
      filter: none;
      font-family: Inter, -apple-system, "system-ui", Roboto, sans-serif;
      font-feature-settings: normal;
      font-size: 14px;
      font-weight: 600;
      margin: 20px auto; // Center the button
      width: fit-content; // Adjust width to content
    }
  
    // Additional CSS styles...
    `;

    // HTML STRUCTURE
    const originalHTML = `
      <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script>
      <style>${customCSS}</style>
      <div class="main">
        <div id="content">${html}</div>
        <div class="footer"> <!-- Footer div for the download button -->
          <button id="download">Download</button>
        </div>
      </div>
      <script>
        // JavaScript for handling the download...
      </script>
    `;

    var encodedHtml = encodeURIComponent(originalHTML);
    return "data:text/html;charset=utf-8," + encodedHtml;
};
