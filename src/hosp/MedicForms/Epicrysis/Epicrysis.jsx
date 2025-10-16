import React, { useState } from "react";
import { BiPrinter } from "react-icons/bi";
// import { Question } from "../PrimaryExamination/Elements/Question/Question";
import LittlePage from "./LittlePage/LittlePage";
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
  const inspection = props.inspection;
  console.log(inspection, "INSPT");
  const [result, setResult] = useState([]);
  const [mainInspect, setmainInspect] = useState([]);
  // const digit = result[10]?.name?.text;
  const [liitleOpen, setLittleOpen] = useState(false);
  const [diagnoses, setDiagnoses] = useState({
    mainDisease: { text: "", mkbCode: "" },
    complications: { text: "", mkbCode: "" },
    externalCause: { text: "", mkbCode: "" },
    concomitantDiseases: { text: "", mkbCode: "" },
  });
  // console.log(digit, "DIGIT22");

  // const getExtractedValues = (data) => {
  //   const extractedValues = [];

  //   for (let i = 0; i < data.length; i++) {
  //     if (data[i].id === null || data[i].id === undefined) {
  //       continue;
  //     }
  //     const answer = data[i];
  //     console.log(answer, "answerrr");
  //     let value;

  //     if (
  //       // typeof answer?.data?.list?.[answer.data.list.length - 1]?.name ===
  //       // "String"
  //       answer?.data?.list?.[answer.data.list.length - 1]?.name
  //     ) {
  //       if (answer?.data?.list?.[answer.data.list.length - 1]?.name) {
  //         // const parsed = JSON.parse(
  //         //   answer?.data?.list?.[answer.data.list.length - 1]?.name
  //         // );
  //         // value = [parsed.text, parsed.mkb10];
  //         value = answer?.data?.list?.[answer.data.list.length - 1]?.name;
  //       }

  //       // console.log(parsed, "PARSS");
  //       // value = [parsed.text, parsed.mkb10];
  //     } else {
  //       value = answer?.data?.list?.[answer.data.list.length - 1]?.name;
  //     }
  //     // const value = answer?.data?.list?.[answer.data.list.length - 1] || "";

  //     extractedValues.push(value);
  //   }
  //   return extractedValues;
  // };

  // const getExtractedValues = (data) => {
  //   const extractedValues = [];

  //   for (let i = 0; i < data.length; i++) {
  //     if (data[i].id === null || data[i].id === undefined) {
  //       continue;
  //     }
  //     const answer = data[i];
  //     let value = answer?.data?.list?.[answer.data.list.length - 1]?.name;

  //     if (typeof value === "string") {
  //       try {
  //         // Пытаемся распарсить JSON
  //         const parsed = JSON.parse(value);
  //         value = [parsed.text, parsed.mkb10]; // если парсинг успешен — заменяем строку на объект/массив
  //       } catch (e) {
  //         // Если парсинг не удался — оставляем строку как есть
  //         console.warn("Не удалось распарсить JSON:", value);
  //       }
  //     }

  //     extractedValues.push(value);
  //   }

  //   return extractedValues;
  // };
  const handleClickInformation = () => {
    setLittleOpen(!liitleOpen);
  };

  const getExtractedValues = (data) => {
    const extractedValues = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === null || data[i].id === undefined) {
        continue;
      }
      const answer = data[i];
      let value = answer?.data?.list?.[answer.data.list.length - 1]?.name;

      if (typeof value === "string") {
        try {
          const parsed = JSON.parse(value);

          if (
            parsed &&
            typeof parsed === "object" &&
            "text" in parsed &&
            "mkb10" in parsed
          ) {
            value = [parsed.text, parsed.mkb10];
          }
        } catch (e) {
          console.warn("Не удалось распарсить JSON:", value);
        }
      }

      extractedValues.push(value);
    }

    return extractedValues;
  };
  const getInspectionValues = (inspection) => {
    const InspectionValues = [];

    for (let i = 0; i < inspection.length; i++) {
      if (inspection[i].id === null || inspection[i].id === undefined) {
        continue;
      }

      const inspect = inspection[i];
      console.log(inspect, "inspectttt");

      let value = inspect?.data?.list?.[inspect.data.list.length - 1]?.name;
      console.log(typeof value);
      if (typeof value === "string") {
        try {
          const parsed = JSON.parse(value);

          if (
            parsed &&
            typeof parsed === "object" &&
            "text" in parsed &&
            "mkb10" in parsed
          ) {
            value = [parsed.text, parsed.mkb10];
          }
        } catch (e) {
          console.warn("Не удалось распарсить JSON:", value);
        }
      }

      InspectionValues.push(value);
    }
    return InspectionValues;
  };

  console.log(data, "EPYCRISIS");

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
  React.useEffect(() => {
    if (inspection && inspection.length > 0) {
      const InspectionValues = getInspectionValues(inspection); // Получаем массив извлечённых значений
      setmainInspect(InspectionValues);
    }
  }, [inspection]);
  React.useEffect(() => {
    if (result.length > 0) {
      setDiagnoses({
        mainDisease: {
          text: result[10]?.[0] || "",
          mkbCode: result[10]?.[1] || "",
        },
        complications: {
          text: result[11]?.[0] || "",
          mkbCode: result[11]?.[1] || "",
        },
        externalCause: {
          text: result[12]?.[0] || "",
          mkbCode: result[12]?.[1] || "",
        },
        concomitantDiseases: {
          text: result[13]?.[0] || "",
          mkbCode: result[13]?.[1] || "",
        },
      });
    }
  }, [result]);
  console.log(result, "EPYCRISIS1212");
  console.log(mainInspect, "EPYCRISIS3333");
  // props.v?.list?.[props.v.list.length - 1]?.name;
  console.log(diagnoses, "diagnnnnnn");
  return (
    <div className="medical-card">
      <h1 className="medical-card__title">Выписной эпикриз</h1>

      {/* Диагнозы с type=4 */}
      <div className="medical-card__section">
        <button className="patient-info-btn" onClick={handleClickInformation}>Анкета пациента</button>
        {liitleOpen ? <LittlePage id={props.id} /> : ""}
        <h2 className="section-title">Диагнозы</h2>

        <div className="field-group">
          <label className="field-label">Диагноз. Основное заболевание:</label>
          <textarea
            value={diagnoses.mainDisease.text}
            // value={JSON.parse(result[10]?.text)}
            className="textarea-field"
            onChange={(e) =>
              handleDiagnosisChange("mainDisease", "text", e.target.value)
            }
          />
          <input
            className="input-field"
            type="text"
            value={diagnoses.mainDisease.mkbCode}
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
            value={diagnoses.complications.text}
            onChange={(e) =>
              handleDiagnosisChange("complications", "text", e.target.value)
            }
          />
          <input
            className="input-field"
            type="text"
            value={diagnoses.complications.mkbCode}
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
            value={diagnoses.externalCause.text}
            onChange={(e) =>
              handleDiagnosisChange("externalCause", "text", e.target.value)
            }
            placeholder="Введите диагноз..."
          />
          <input
            className="input-field"
            type="text"
            value={diagnoses.externalCause.mkbCode}
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
            value={diagnoses.concomitantDiseases.text}
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
            value={diagnoses.concomitantDiseases.mkbCode}
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
            value={result[0]}
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
