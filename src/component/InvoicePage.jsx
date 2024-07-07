import { useForm, useFieldArray } from "react-hook-form";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function InvoicePage() {
  const { register, handleSubmit, reset, control, watch } = useForm({
    defaultValues: {
      items: [{ description: "", unitCost: "", quantity: "", amount: "" }],
    },
  });

  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(subTotal);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [currency, setCurrency] = useState("");
  const { fields, append } = useFieldArray({
    control,
    name: "items",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCalculateAmount = (index) => {
    const items = watch("items");
    let unitCost = 0;
    if (items[index].unitCost) {
      unitCost = parseInt(items[index].unitCost);
    }
    console.log(unitCost);
    let quantity = 0;
    if (items[index].quantity) {
      quantity = parseInt(items[index].quantity);
    }
    console.log(quantity);
    const amount = parseInt(unitCost * quantity);
    setTotal(subTotal - items[index].amount + amount);
    setSubTotal(subTotal - items[index].amount + amount);
    // Update the amount field
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, amount } : item
    );
    reset({ items: updatedItems });
  };

  const unitCostChange = (index, event) => {
    const items = watch("items");
    const unitCost = parseInt(event.target.value);
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, unitCost } : item
    );
    reset({ items: updatedItems });
    handleCalculateAmount(index);
  };

  const quantityChange = (index, event) => {
    const items = watch("items");
    const quantity = parseInt(event.target.value);
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, quantity } : item
    );
    reset({ items: updatedItems });
    handleCalculateAmount(index);
  };

  const removeRow = (index) => {
    const items = watch("items");
    setSubTotal(subTotal - items[index].amount);
    setTotal(subTotal - items[index].amount + tax - discount + shippingFee);
    items.splice(index, 1);
    reset({ items });
  };

  function selectCurrency(event) {
    setCurrency(event.target.value);
  }

  function taxChange(event) {
    let count = 0;
    if (event.target.value) {
      count = parseInt(event.target.value);
    }
    setTax(count);
    let taxAmount = parseFloat(((count * subTotal) / 100).toFixed(2));
    let amount = subTotal + taxAmount + shippingFee - discount;
    setTotal(amount);
  }

  function discountChange(event) {
    setDiscount(parseInt(event.target.value ? event.target.value : 0));
    let taxAmount = parseFloat(((tax * subTotal) / 100).toFixed(2));
    let amount = parseFloat(
      (
        parseInt(subTotal) +
        taxAmount +
        shippingFee -
        parseInt(event.target.value ? event.target.value : 0)
      ).toFixed(2)
    );
    setTotal(amount);
  }

  function shippingChange(event) {
    setShippingFee(parseInt(event.target.value ? event.target.value : 0));
    let taxAmount = parseFloat(((tax * subTotal) / 100).toFixed(2));
    let amount = parseFloat(
      (
        parseInt(subTotal) +
        taxAmount +
        parseInt(event.target.value ? event.target.value : 0) -
        discount
      ).toFixed(2)
    );
    setTotal(amount);
  }

  const onSubmit = (data) => {
     if (!image || !data.InvoiceNumber || !data.PurchaseOrder || !data.YourCompanyDetails || !data.BillTo || !data.currency || !data.InvoiceDate || !data.PaymentDueDate ) {
        toast.error('Please Enter all required field', {
            autoClose: 2000,
          });
          return;

      }
    const doc = new jsPDF();
      const imgProps = doc.getImageProperties(image);
      const imgWidth = 50;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
      doc.setFillColor(60, 179, 113); // Green background
      doc.rect(0, 0, doc.internal.pageSize.width, imgHeight, "F");
      doc.setFontSize(22);
      doc.setTextColor(255, 255, 255); // White text
      doc.text(`Invoice for ${data.YourCompanyDetails}`, 105, 20, null, null, "center");
      doc.addImage(image, "JPEG", 10, 0, imgWidth, imgHeight);
    
      
      doc.setTextColor(0, 0, 0); // Black text
      doc.setFontSize(12);
      const startX = 10;
      const startY = imgHeight;
      const lineSpacing = 10;
      doc.setFillColor(225, 200, 200); // body background
      doc.rect(0, startY, doc.internal.pageSize.width, doc.internal.pageSize.height-imgHeight, "F");
    
    doc.text(`Invoice Number: ${data.InvoiceNumber}`, startX, startY+lineSpacing);
    doc.text(`Purchase Order: ${data.PurchaseOrder}`, 100, startY+lineSpacing);

    
    doc.text(`Invoice Date: ${data.InvoiceDate}`, startX, startY+ 2*lineSpacing);
    doc.text(`Payment Due Date: ${data.PaymentDueDate}`, 100, startY+ 2*lineSpacing);

    
    doc.text('Your Company Details:', startX, startY+ 3*lineSpacing);
    doc.text(`${data.YourCompanyDetails}`, 60, startY+ 3*lineSpacing);

    doc.text('Bill To:', startX, startY+ 4*lineSpacing);
    doc.text(data.BillTo, 30, startY+ 4*lineSpacing);


    doc.setDrawColor(60, 179, 113);
    doc.setLineWidth(0.5);
    doc.line(10, startY+ 5*lineSpacing, 200, startY+ 5*lineSpacing);

    
    doc.autoTable({
      startY: startY+ 6*lineSpacing,
      head: [['Item Description', 'Unit Cost', 'Quantity', 'Amount']],
      body: data.items.map(item => [
        item.description,
        item.unitCost,
        item.quantity,
        item.amount,
      ]),
      headStyles: { fillColor: [60, 179, 113] },
      styles: { fontSize: 12 },
    });

    const taxAmount = ((tax / 100) * subTotal).toFixed(2);
    const tableEndY = doc.lastAutoTable.finalY + 10;

    // Subtotal
    doc.text(`Subtotal: ${subTotal} ${currency}`, 200, tableEndY, null, null, 'right');

    // Tax
    doc.text(`Tax: (${tax}%) ${taxAmount}  ${currency}`, 200, tableEndY + 10, null, null, 'right');

    // Discount
    doc.text(`Discount: ${discount} ${currency}`, 200, tableEndY + 20, null, null, 'right');

    // Shipping Fee
    doc.text(`Shipping Fee: ${shippingFee} ${currency}`, 200, tableEndY + 30, null, null, 'right');

    // Total
    doc.setFontSize(14);
    doc.text(`Total: ${total} ${currency}`, 200, tableEndY + 40, null, null, 'right');

    // Footer
    const pageHeight = doc.internal.pageSize.height;
    const footerY = pageHeight - 30;
    doc.setFontSize(10);
    doc.setTextColor(88, 70, 70); // Gray text
    doc.text('Thank you for your business!', 10, footerY);
    doc.text('Contact us: sourabhbhattacharjee123@outlook.com | +49 152 220 14961', 10, footerY + 10);
    doc.text('Address: Kurt Schumacher Straße 12.1.4 , Kaiserslautern, Germany ', 10, footerY + 20);

    doc.save(`${data.YourCompanyDetails} invoice .pdf`);

    reset();
    setImage(null);
    setImagePreview(null);
    const items = watch("items");
    items.splice(1,items.length);
    items[0].amount ="";
    items[0].description ="";
    items[0].quantity="";
    items[0].unitCost="";
    reset({ items });
    setSubTotal(0);
    setTotal(0);
  };

  return (
    <>
      <form className="bg-color-blue" onSubmit={handleSubmit(onSubmit)}>
        <div className="bodyMainDiv invpage">
          <div>
            <div className="invContent">
              <h1>Free invoice generator.</h1>
              <div style={{ width: "100%", "margin-bottom": "20px" }}>
                <div className="widthHalf">
                  <div className="widthHalf floatLeft">
                    <label className="invlabel">Invoice number</label>
                    <input className="invInp" {...register("InvoiceNumber")} />
                  </div>
                  <div className="widthHalf">
                    <label className="invlabel">Purchase order</label>
                    <input className="invInp" {...register("PurchaseOrder")} />
                  </div>
                </div>
                <div className="widthHalf">
                  <label className="invlabel">Logo</label>
                  <input
                    className="invInp"
                    style={{ width: "42%" }}
                    type="file"
                    accept=".jpg,.jpeg,image/jpeg,.png,image/png"
                    onChange={(e) => {
                      handleImageChange(e);
                    }}
                  />
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="invImg" />
                  )}
                </div>
              </div>
              <div style={{ width: "100%", "margin-bottom": "20px" }}>
                <div className="widthHalf">
                  <div
                    className="floatLeft"
                    style={{
                      marginLeft: "12px",
                      marginRight: "12px",
                      width: "80%",
                    }}
                  >
                    <label className="invlabel">Your company details</label>
                    <textarea
                      className="invInp textInp"
                      {...register("YourCompanyDetails")}
                    />
                  </div>
                </div>
                <div className="widthHalf">
                  <div
                    style={{
                      marginLeft: "12px",
                      marginRight: "12px",
                      width: "80%",
                    }}
                  >
                    <label className="invlabel">Bill To</label>
                    <textarea
                      className="invInp textInp"
                      {...register("BillTo")}
                    />
                  </div>
                </div>
              </div>
              <div style={{ width: "100%", "margin-bottom": "20px" }}>
                <div className="widthHalf">
                  <div
                    className="floatLeft"
                    style={{
                      marginLeft: "12px",
                      marginRight: "12px",
                      width: "80%",
                    }}
                  >
                    <label className="invlabel">Currency</label>
                    <select
                      className="invInp"
                      style={{ width: "108%", height: "54px" }}
                      {...register("currency")}
                      onChange={(event) => selectCurrency(event)}
                    >
                      <option value="">Select a currency</option>
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="JPY">JPY - Japanese Yen</option>
                      <option value="AUD">AUD - Australian Dollar</option>
                      <option value="CAD">CAD - Canadian Dollar</option>
                      <option value="CHF">CHF - Swiss Franc</option>
                      <option value="CNY">CNY - Chinese Yuan</option>
                      <option value="INR">INR - Indian Rupee</option>
                      <option value="BRL">BRL - Brazilian Real</option>
                    </select>
                  </div>
                </div>
                <div
                  className="widthHalf"
                  style={{ top: "-21px", position: "relative" }}
                >
                  <div className="widthHalf">
                    <label className="invlabel">Invoice Date</label>
                    <input
                      type="date"
                      style={{ width: "64%" }}
                      className="invInp"
                      {...register("InvoiceDate")}
                    />
                  </div>
                  <div className="widthHalf">
                    <label className="invlabel">Payment Due Date</label>
                    <input
                      type="date"
                      style={{ width: "64%" }}
                      className="invInp"
                      {...register("PaymentDueDate")}
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  "margin-bottom": "20px",
                  backgroundColor: "#d319196e",
                }}
              >
                {fields.map((field, index) => (
                  <div key={field.id} className="greyTxtRow">
                    <div className="dynamicBox">
                      <label className="invlabel">
                        Item Description {index + 1}
                      </label>
                      <input
                        className="invInp"
                        {...register(`items.${index}.description`)}
                      />
                    </div>
                    <div className="dynamicBox">
                      <label className="invlabel">Unit Cost</label>
                      <input
                        type="number"
                        className="invInp"
                        {...register(`items.${index}.unitCost`)}
                        onChange={(event) => unitCostChange(index, event)}
                      />
                    </div>
                    <div className="dynamicBox">
                      <label className="invlabel">Quantity</label>
                      <input
                        type="number"
                        className="invInp"
                        {...register(`items.${index}.quantity`)}
                        onChange={(event) => quantityChange(index, event)}
                      />
                    </div>
                    <div className="dynamicBox">
                      <label className="invlabel">Amount</label>
                      <input
                        type="text"
                        className="invInp"
                        {...register(`items.${index}.amount`)}
                        readOnly
                      />
                    </div>
                    <img
                      className="delItem"
                      src="https://cdn-icons-png.flaticon.com/128/2997/2997911.png"
                      alt="cross"
                      onClick={() => removeRow(index)}
                    />
                  </div>
                ))}
                <div
                  className="addSec"
                  onClick={() =>
                    append({
                      description: "",
                      unitCost: "",
                      quantity: "",
                      amount: "",
                    })
                  }
                >
                  <img
                    className="addDynamicrow"
                    src="https://cdn-icons-png.flaticon.com/128/16170/16170755.png"
                    alt="add"
                  />
                  <span>Add Item</span>
                </div>
              </div>
              <div
                className="subtot"
                style={{
                  width: "100%",
                  float: "right",
                  "margin-bottom": "20px",
                  display: "inline-block",
                }}
              >
                <span className="stTax">Subtotal:</span>
                <span style={{ float: "right" }}>
                  {subTotal + " " + currency}
                </span>
              </div>
              <div
                className="subtot"
                style={{
                  width: "100%",
                  float: "right",
                  "margin-bottom": "20px",
                  display: "inline-block",
                }}
              >
                <span className="stTax"> Tax %</span>
                <input
                  className="invInp taxF"
                  type="number"
                  onChange={(event) => {
                    taxChange(event);
                  }}
                />
                <img
                  src="https://cdn-icons-png.flaticon.com/128/98/98913.png"
                  alt="percentage"
                  className="percentage"
                />
              </div>
              <div
                className="subtot"
                style={{
                  width: "100%",
                  float: "right",
                  "margin-bottom": "20px",
                  display: "inline-block",
                }}
              >
                <span className="stTax">
                  Discount {currency ? "(" + currency + ")" : null}{" "}
                </span>
                <input
                  className="invInp taxF"
                  type="number"
                  onChange={(event) => {
                    discountChange(event);
                  }}
                />
              </div>
              <div
                className="subtot"
                style={{
                  width: "100%",
                  float: "right",
                  "margin-bottom": "20px",
                  display: "inline-block",
                }}
              >
                <span className="stTax"> Shipping Fee </span>
                <input
                  className="invInp taxF"
                  type="number"
                  onChange={(event) => {
                    shippingChange(event);
                  }}
                />
              </div>
              <div
                className="subtot"
                style={{
                  width: "100%",
                  float: "right",
                  "margin-bottom": "20px",
                  display: "inline-block",
                }}
              >
                <span className="stTax">Total:</span>
                <span style={{ float: "right" }}>{total + " " + currency}</span>
              </div>
              <button type="submit">Create and Download your Invoice </button>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}
