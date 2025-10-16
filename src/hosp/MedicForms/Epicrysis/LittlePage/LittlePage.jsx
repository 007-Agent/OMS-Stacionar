import React, { useState } from "react";
import "./littlepage.scss";
import axios from "axios";

const LittlePage = (props) => {
  const [form, setForm] = useState();
  const id = props.id;
  console.log(id, "IDDDD");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(data, "ЭПИКРИЗЗ");

  React.useEffect(() => {
    if (!id) {
      setError("ID не передан");
      setLoading(false);
      return;
    }

    axios
      .post("/rest/hosp/man", { hospId: id })
      .then((response) => {
        const result = response.data.data;
        if (result) {
          setData(result);
        } else {
          setError("Данные не найдены");
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);
  const object = data;

  // React.useEffect(() => {
  //   if (data) {
  //     const defaultForm = {
  //       organization: "",

  //       department: "",
  //       medicalCardNumber: "",
  //       patientName: "",
  //       birthDate: "",
  //       gender: "",

  //       region: "",
  //       district: "",
  //       city: "",
  //       locality: "",
  //       street: "",
  //       house: "",
  //       building: "",
  //       apartment: "",
  //     };

  //     setForm({
  //       ...defaultForm,
  //       ...data,
  //     });
  //   }
  // }, [data]);
  console.log(data, "ЭПИКРИЗЗ");
  console.log(object, "ЭПИКРИЗЗ");

  if (loading) {
    return <p>Загрузка данных...</p>;
  }

  // 2. Если ошибка — показываем ошибку
  return error ? (
    <p>Ошибка: {error}</p>
  ) : loading ? (
    <p>Загрузка данных...</p>
  ) : (
    <form className="medical-form">
      <h2>Анкета медицинской организации</h2>

      <label>
        Наименование медицинской организации (ФИО ИП):
        <input type="text" name="organization" value={data.ankFio} />
      </label>

      <label>
        Наименование отделения (структурного подразделения):
        <input type="text" name="department" />
      </label>

      <label>
        Номер медицинской карты:
        <input type="text" name="medicalCardNumber" />
      </label>

      <fieldset>
        <legend>Сведения о пациенте</legend>

        <label>
          Фамилия, имя, отчество (при наличии):
          <input type="text" name="patientName" value={data.ankFio} />
        </label>
        <div className="content__birth">
          <label>
            Дата рождения:
            <input
              type="text"
              name="birthDate"
              value={String(data.ankBday || "")}
            />
          </label>

          <label>
            Пол:
            <input
              type="text"
              value={String(data.ankPolId === "2" ? "Женский" : "Мужской")}
            />
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Регистрация по месту жительства</legend>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          <label>
            Субъект РФ:
            <input
              type="text"
              name="residence.region"
              placeholder="Регион"
              value={data.ankRegion}
            />
          </label>

          <label>
            Район:
            <input
              type="text"
              name="residence.district"
              placeholder="Район"
              value={data.ankStreet}
            />
          </label>

          <label>
            Город:
            <input
              type="text"
              name="residence.city"
              placeholder="Город"
              value={data.ankRegion}
            />
          </label>

          <label>
            Населенный пункт:
            <input
              type="text"
              name="residence.locality"
              placeholder="Населенный пункт"
            />
          </label>
          <label>
            Дом:
            <input
              type="text"
              name="residence.house"
              placeholder="Дом"
              value={data.ankHouse}
            />
          </label>

          <label>
            Квартира:
            <input
              type="text"
              name="residence.apartment"
              placeholder="Квартира"
              value={data.ankFlat}
            />
          </label>
        </div>

        <label>
          Улица:
          <input
            type="text"
            name="residence.street"
            placeholder="Улица"
            value={data.ankStreet}
          />
        </label>
      </fieldset>

      <fieldset>
        <legend>Регистрация по месту пребывания</legend>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          <label>
            Субъект РФ:
            <input
              type="text"
              name="residence.region"
              placeholder="Регион"
              value={data.ankRegion}
            />
          </label>

          <label>
            Район:
            <input
              type="text"
              name="residence.district"
              placeholder="Район"
              value={data.ankStreet}
            />
          </label>

          <label>
            Город:
            <input
              type="text"
              name="residence.city"
              placeholder="Город"
              value={data.ankRegion}
            />
          </label>

          <label>
            Населенный пункт:
            <input
              type="text"
              name="residence.locality"
              placeholder="Населенный пункт"
            />
          </label>
          <label>
            Дом:
            <input
              type="text"
              name="residence.house"
              placeholder="Дом"
              value={data.ankHouse}
            />
          </label>

          <label>
            Квартира:
            <input
              type="text"
              name="residence.apartment"
              placeholder="Квартира"
              value={data.ankFlat}
            />
          </label>
        </div>

        <label>
          Улица:
          <input
            type="text"
            name="residence.street"
            placeholder="Улица"
            required
          />
        </label>
      </fieldset>

      <fieldset>
        <legend>Поступление и период нахождения</legend>

        <label>
          Поступил:
          <select name="admissionType" required>
            <option value="">Выберите</option>
            <option value="1">В стационар</option>
            <option value="2">В дневной стационар</option>
          </select>
        </label>

        <div className="hospital-period">
          <div>
            <label>
              Период с (дата):
              <input type="date" name="hospitalPeriodStartDate" required />
            </label>

            <label>
              Время (час : мин):
              <input
                type="number"
                name="hospitalPeriodStartTimeHour"
                min="0"
                max="23"
                required
              />
            </label>
          </div>

          <div>
            <label>
              По (дата):
              <input type="date" name="hospitalPeriodEndDate" required />
            </label>

            <label>
              Время (час : мин):
              <input
                type="number"
                name="hospitalPeriodEndTimeHour"
                min="0"
                max="23"
                required
              />
            </label>
          </div>
        </div>

        <label>
          Количество дней нахождения:
          <input type="number" name="daysInHospital" min="0" required />
        </label>
      </fieldset>

      <fieldset>
        <legend>Исход и результат госпитализации</legend>

        <label>
          Исход госпитализации:
          <select name="dischargeOutcome" required>
            <option value="">Выберите</option>
            <option value="1">Выписан</option>
            <option value="2">В дневной стационар</option>
            <option value="3">В стационар</option>
          </select>
        </label>

        <label>
          Результат госпитализации:
          <select name="dischargeResult" required>
            <option value="">Выберите</option>
            <option value="1">Выздоровление</option>
            <option value="2">Улучшение</option>
            <option value="3">Без перемен</option>
            <option value="4">Ухудшение</option>
          </select>
        </label>
      </fieldset>

      <label>
        Дополнительные сведения о пациенте и госпитализации:
        <textarea
          name="additionalInfo"
          placeholder="Введите дополнительные сведения"
          rows="4"
        />
      </label>

      <button type="submit">Отправить</button>
    </form>
  );
};

export default LittlePage;
