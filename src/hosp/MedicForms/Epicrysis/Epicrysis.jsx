import React, { useState } from "react";
import { BiPrinter } from "react-icons/bi";
import { Question } from "../PrimaryExamination/Elements/Question/Question";
import axios from "axios";
import "./epicrysis.scss";
// export const Epicrysis = (props) => {
//   const [data, setData] = useState(props.data);
//   const id = props.id;
//   console.log(data, "SECONDCHECK");

//   const clickHandlePrinter = async () => {
//     const url = "/rest/hosp/statcard";

//     try {
//       const response = await axios.post(url, {
//         id,
//         repCode: "stat.card.epicrisis",
//       });
//       console.log(response.data, "ответ от сервера");
//       if (response.status === 200) {
//         let base64Data = response.data.data;
//         console.log(base64Data, "base64Data");
//         if (typeof base64Data !== "string") {
//           console.error("Полученные данные не являются строкой:", base64Data);
//           return;
//         }

//         base64Data = base64Data.replace(/-/g, "+").replace(/_/g, "/");

//         const padding = base64Data.length % 4;

//         if (padding) {
//           base64Data += "=".repeat(4 - padding);
//         }

//         const byteCharacters = atob(base64Data);
//         const byteNumbers = new Uint8Array(byteCharacters.length);
//         for (let i = 0; i < byteCharacters.length; i++) {
//           byteNumbers[i] = byteCharacters.charCodeAt(i);
//         }
//         const blob = new Blob([byteNumbers], { type: "application/pdf" });

//         const link = document.createElement("a");
//         link.href = window.URL.createObjectURL(blob);
//         link.setAttribute("download", "stat_card_epycrisis.pdf");
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//       }
//     } catch (error) {
//       console.error("Ошибка при получении файла:", error);
//     }
//   };

//   let content = (
//     <div>
//       {data.map((v, index) => {
//         const originalIndex = index;
//         return v.id !== null ? (
//           <Question key={v.data.id} v={v} index={originalIndex} />
//         ) : (
//           <div className="text__info" key={index}>{`${v.name}:`}</div>
//         );
//       })}
//     </div>
//   );

//   return (
//     <div className="primary__main">
//       <div className="button__form"></div>
//       <BiPrinter onClick={clickHandlePrinter} />
//       {content}
//     </div>
//   );
// };
export const Epicrysis = (props) => {
  const data = props.data;
  const [result, setResult] = useState([]);
  // const digit = result[10]?.name?.text;

  // console.log(digit, "DIGIT22");
  const getExtractedValues = (data) => {
    const extractedValues = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === null || data[i].id === undefined) {
        continue;
      }
      const answer = data[i];
      console.log(answer, "answerrr");
      let value;
      if (answer?.data?.list?.[answer.data.list.length - 1]?.key) {
        const parsed = JSON.parse(
          answer?.data?.list?.[answer.data.list.length - 1]?.name
        );
        value = parsed.text || "";
      } else {
        value = answer?.data?.list?.[answer.data.list.length - 1]?.name;
      }
      // const value = answer?.data?.list?.[answer.data.list.length - 1] || "";

      extractedValues.push(value);
    }
    return extractedValues;
  };

  console.log(data, "EPYCRISIS");
  const [diagnoses, setDiagnoses] = useState({
    mainDisease: { text: "", mkbCode: "" },
    complications: { text: "", mkbCode: "" },
    externalCause: { text: "", mkbCode: "" },
    concomitantDiseases: { text: "", mkbCode: "" },
  });

  const [additionalInfo, setAdditionalInfo] = useState({
    admissionState: "",
    specialistExams: "",
    medicalExamResults: "",
    medications: "",
    transfusions: "",
    surgeries1: "",
    surgeries2: "",
    medicalInterventions: "",
    additionalDetails: "",
    dischargeState: "",
    recommendations: "",
  });

  const handleDiagnosisChange = (key, field, value) => {
    setDiagnoses((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  };

  const handleAdditionalChange = (key, value) => {
    setAdditionalInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Сохранение данных (демо)
  const handleSave = () => {
    const data = { diagnoses, additionalInfo };
    console.log("Сохраненные данные:", JSON.stringify(data, null, 2));
    alert("Данные сохранены (проверьте консоль)");
  };

  React.useEffect(() => {
    if (data && data.length > 0) {
      const extractedValues = getExtractedValues(data); // Получаем массив извлечённых значений
      setResult(extractedValues);
    }
  }, [data]);
  console.log(result, "EPYCRISIS1212");
  // props.v?.list?.[props.v.list.length - 1]?.name;

  return (
    <div className="medical-card">
      <h1 className="medical-card__title">Выписной эпикриз</h1>

      {/* Диагнозы с type=4 */}
      <div className="medical-card__section">
        <h2 className="section-title">Диагнозы</h2>

        <div className="field-group">
          <label className="field-label">Диагноз. Основное заболевание:</label>
          <textarea
            value={result[10]?.text}
            // value={JSON.parse(result[10]?.text)}
            className="textarea-field"
            onChange={(e) =>
              handleDiagnosisChange("mainDisease", "text", e.target.value)
            }
          />
          <input
            className="input-field"
            type="text"
            onChange={(e) =>
              handleDiagnosisChange("mainDisease", "mkbCode", e.target.value)
            }
            placeholder="Код по МКБ"
          />
        </div>

        <div className="field-group">
          <label className="field-label">
            Диагноз: Осложнения основного заболевания:
          </label>
          <textarea
            className="textarea-field"
            onChange={(e) =>
              handleDiagnosisChange("complications", "text", e.target.value)
            }
          />
          <input
            className="input-field"
            type="text"
            onChange={(e) =>
              handleDiagnosisChange("complications", "mkbCode", e.target.value)
            }
            placeholder="Код по МКБ"
          />
        </div>

        <div className="field-group">
          <label className="field-label">
            Внешняя причина при травмах, отравлениях:
          </label>
          <textarea
            className="textarea-field"
            onChange={(e) =>
              handleDiagnosisChange("externalCause", "text", e.target.value)
            }
            placeholder="Введите диагноз..."
          />
          <input
            className="input-field"
            type="text"
            onChange={(e) =>
              handleDiagnosisChange("externalCause", "mkbCode", e.target.value)
            }
            placeholder="Код по МКБ"
          />
        </div>

        <div className="field-group">
          <label className="field-label">Сопутствующие заболевания:</label>
          <textarea
            className="textarea-field"
            onChange={(e) =>
              handleDiagnosisChange(
                "concomitantDiseases",
                "text",
                e.target.value
              )
            }
            placeholder="Введите диагноз..."
          />
          <input
            className="input-field"
            type="text"
            onChange={(e) =>
              handleDiagnosisChange(
                "concomitantDiseases",
                "mkbCode",
                e.target.value
              )
            }
            placeholder="Код по МКБ"
          />
        </div>
      </div>

      {/* Дополнительные сведения */}
      <div className="medical-card__section">
        <h2 className="section-title">Дополнительные сведения о заболевании</h2>

        <div className="field-group">
          <label className="field-label">Состояние при поступлении:</label>
          <textarea
            className="textarea-field"
            onChange={(e) =>
              handleAdditionalChange("admissionState", e.target.value)
            }
            placeholder="Введите состояние..."
          />
        </div>

        <div className="field-group">
          <label className="field-label">
            Осмотры врачей-специалистов, врачебные комиссии:
          </label>
          <textarea
            className="textarea-field"
            onChange={(e) =>
              handleAdditionalChange("specialistExams", e.target.value)
            }
          />
        </div>

        <div className="field-group">
          <label className="field-label">
            Результаты медицинского обследования:
          </label>
          <textarea
            className="textarea-field"
            onChange={(e) =>
              handleAdditionalChange("medicalExamResults", e.target.value)
            }
          />
        </div>

        <div className="field-group">
          <label className="field-label">
            Применение лекарственных препаратов:
          </label>
          <textarea
            className="textarea-field"
            onChange={(e) =>
              handleAdditionalChange("medications", e.target.value)
            }
          />
        </div>

        <div className="field-group">
          <label className="field-label">
            Трансфузии (переливания) донорской крови:
          </label>
          <textarea
            className="textarea-field"
            onChange={(e) =>
              handleAdditionalChange("transfusions", e.target.value)
            }
          />
        </div>

        <div className="field-group">
          <label className="field-label">
            Оперативные вмешательства (операции):
          </label>
          <textarea
            className="textarea-field"
            onChange={(e) =>
              handleAdditionalChange("surgeries1", e.target.value)
            }
          />
        </div>

        <div className="field-group">
          <label className="field-label">
            Оперативные вмешательства (операции):
          </label>{" "}
          {/* Повтор, как в вашем списке */}
          <textarea
            className="textarea-field"
            onChange={(e) =>
              handleAdditionalChange("surgeries2", e.target.value)
            }
          />
        </div>

        <div className="field-group">
          <label className="field-label">Медицинские вмешательства:</label>
          <textarea
            className="textarea-field"
            onChange={(e) =>
              handleAdditionalChange("medicalInterventions", e.target.value)
            }
          />
        </div>

        <div className="field-group">
          <label className="field-label">Дополнительные сведения:</label>
          <textarea
            className="textarea-field"
            onChange={(e) =>
              handleAdditionalChange("additionalDetails", e.target.value)
            }
          />
        </div>

        <div className="field-group">
          <label className="field-label">
            Состояние при выписке, трудоспособность:
          </label>
          <textarea
            className="textarea-field"
            onChange={(e) =>
              handleAdditionalChange("dischargeState", e.target.value)
            }
          />
        </div>

        <div className="field-group">
          <label className="field-label">Рекомендации:</label>
          <textarea
            className="textarea-field"
            onChange={(e) =>
              handleAdditionalChange("recommendations", e.target.value)
            }
          />
        </div>
      </div>

      <button className="save-button" onClick={handleSave}>
        Сохранить
      </button>
    </div>
  );
};

export default Epicrysis;
