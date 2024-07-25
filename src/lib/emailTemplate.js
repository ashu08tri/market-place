export function createEmailHtml(products) {
  const productHtml = products.map(product => `
    <div style="margin-bottom: 20px;">
      <h2 style="font-size: 20px; color: #333333;">${product.title}</h2>
      <img src="${product.img[0]}" alt="${product.title}" style="width: 25%; height: 25%; object-fit: cover; border-radius: 8px;"/>
      <p style="font-size: 18px; color: #1a8a27; font-weight: bold;">&#x20B9; ${product.amount}</p>
    </div>
  `).join('');

  return `
    <html lang="en">
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h1 style="font-size: 24px; color: #333333;">Order Confirmation</h1>
          <p style="font-size: 16px; color: #666666;">Thank you for your purchase!</p>
          ${productHtml}
          <hr style="margin: 30px 0; border-top: 1px solid #dddddd;"/>
          <p style="font-size: 14px; color: #999999; text-align: center;">We hope you enjoy your purchase. If you have any questions, feel free to contact us.</p>
        </div>
      </body>
    </html>
  `;
}
