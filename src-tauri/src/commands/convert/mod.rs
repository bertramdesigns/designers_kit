use poppler_utils_rs::pdf_to_html::{pdf_to_html, PdfToHtmlConfig};
use poppler_utils_rs::utils::AsPopplerPath;

use crate::utils::Error;

// function to convert pdf to HTML using poppler
// @param pdfPath: path to the pdf file
// @param outputPath: path to the output folder
// @param options: a javasctipt object containing the poppler options for
// returns a zip file containing the HTML and images
#[tauri::command]
pub async fn convert_pdf_to_html(
    file_path: String,
    _output_path: String,
    _options: Vec<u8>,
) -> Result<std::string::String, Error> {
    let file = file_path.as_poppler_path();
    let config = PdfToHtmlConfig::default();
    // config.print_help = true;

    let result = pdf_to_html(file, config).await?;
    Ok(result)
}
