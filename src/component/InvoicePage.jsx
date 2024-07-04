import { useForm, useFieldArray } from "react-hook-form";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useState } from "react";
export default function InvoicePage() {
  const { register, handleSubmit, reset, control, watch } = useForm({
    defaultValues: {
      items: [{ description: "", unitCost: "", quantity: "", amount: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        //setImage(reader.result);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleCalculateAmount = (index) => {
    const items = watch("items");
    const unitCost = items[index]?.unitCost || 0;
    const quantity = items[index]?.quantity || 0;
    const amount = unitCost * quantity;

    // Update the amount field
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, amount } : item
    );
    reset({ items: updatedItems });
  };

  const unitCostChange = (index , event) => {
    const items = watch("items");
    const unitCost = event.target.value;
    const updatedItems = items.map((item, i) =>
        i === index ? { ...item, unitCost } : item
      );
    reset({ items: updatedItems });
    handleCalculateAmount(index);
  }

  const quantityChange = (index , event) => {
    const items = watch("items");
    const quantity = event.target.value;
    const updatedItems = items.map((item, i) =>
        i === index ? { ...item, quantity } : item
      );
    reset({ items: updatedItems });
    handleCalculateAmount(index);
  }


  return (
    <form className="bg-color-blue">
      <div className="bodyMainDiv invpage">
        <div className="invContent">
          <h1>Free invoice generator.</h1>
          <div style={{ width: "100%", "margin-bottom": "20px" }}>
            <div className="widthHalf">
              <div className="widthHalf floatLeft">
                <label className="invlabel">Invoice number</label>
                <input
                  className="invInp"
                  {...register("Invoice number", { required: true })}
                />
              </div>
              <div className="widthHalf">
                <label className="invlabel">Purchase order</label>
                <input
                  className="invInp"
                  {...register("Purchase order", { required: true })}
                />
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
                  {...register("Your company details", { required: true })}
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
                  {...register("Bill To", { required: true })}
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
                  {...register("currency", { required: true })}
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
                  {...register("Invoice date", { required: true })}
                />
              </div>
              <div className="widthHalf">
                <label className="invlabel">Payment Due Date</label>
                <input
                  type="date"
                  style={{ width: "64%" }}
                  className="invInp"
                  {...register("Payment Due date", { required: true })}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              "margin-bottom": "20px",
              backgroundColor: "GrayText",
            }}
          >
            <div>
              {fields.map((field, index) => (
                <div key={field.id}>
                  <div>
                    <label className="invlabel">Item Description</label>
                    <input
                      className="invInp"
                      {...register(`items.${index}.description`, {
                        required: true,
                      })}
                    />
                  </div>
                  <div>
                    <label className="invlabel">Unit Cost</label>
                    <input
                      type="number"
                      className="invInp"
                      step="1"
                      {...register(`items.${index}.unitCost`, {
                        required: true,
                      })}
                      onChange={(event) => unitCostChange(index , event)}
                    />
                  </div>
                  <div>
                    <label className="invlabel">Quantity</label>
                    <input
                      type="number"
                      className="invInp"
                      {...register(`items.${index}.quantity`, {
                        required: true,
                      })}
                      onChange={(event) => quantityChange(index , event)}
                    />
                  </div>
                  <div>
                    <label className="invlabel">Amount</label>
                    <input
                      type="text"
                      className="invInp"
                      {...register(`items.${index}.amount`)}
                      readOnly
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
