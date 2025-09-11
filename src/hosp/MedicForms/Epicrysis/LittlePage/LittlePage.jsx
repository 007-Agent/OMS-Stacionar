import React, { useState } from "react";
import "./littlepage.scss";

const LittlePage = () => {
  const [form, setForm] = useState({
    organization: "",
    ogrn: "",
    department: "",
    medicalCardNumber: "",
    patientName: "",
    birthDate: "",
    gender: "",
    registrationResidence: {
      region: "",
      district: "",
      city: "",
      locality: "",
      street: "",
      house: "",
      building: "",
      apartment: "",
    },
    registrationStay: {
      region: "",
      district: "",
      city: "",
      locality: "",
      street: "",
      house: "",
      building: "",
      apartment: "",
    },
    admissionType: "",
    hospitalPeriodStartDate: "",
    hospitalPeriodStartTimeHour: "",
    hospitalPeriodStartTimeMinute: "",
    hospitalPeriodEndDate: "",
    hospitalPeriodEndTimeHour: "",
    hospitalPeriodEndTimeMinute: "",
    daysInHospital: "",
    dischargeOutcome: "",
    dischargeResult: "",
    additionalInfo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Для вложенных объектов (регистрации)
    if (name.startsWith("residence.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        registrationResidence: { ...prev.registrationResidence, [key]: value },
      }));
    } else if (name.startsWith("stay.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        registrationStay: { ...prev.registrationStay, [key]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Отправка формы:", form);
    // Здесь можно добавить отправку на сервер и валидацию
  };

  return (
    <form className="medical-form" onSubmit={handleSubmit}>
      <h2>Анкета медицинской организации</h2>

      <label>
        Наименование медицинской организации (ФИО ИП):
        <input
          type="text"
          name="organization"
          value={form.organization}
          onChange={handleChange}
          placeholder="Введите наименование"
          required
        />
      </label>

      <label>
        ОГРН (ОГРНИП):
        <input
          type="text"
          name="ogrn"
          value={form.ogrn}
          onChange={handleChange}
          placeholder="Введите ОГРН"
          required
        />
      </label>

      <label>
        Наименование отделения (структурного подразделения):
        <input
          type="text"
          name="department"
          value={form.department}
          onChange={handleChange}
          placeholder="Введите отделение"
          required
        />
      </label>

      <label>
        Номер медицинской карты:
        <input
          type="text"
          name="medicalCardNumber"
          value={form.medicalCardNumber}
          onChange={handleChange}
          placeholder="Введите номер карты"
          required
        />
      </label>

      <fieldset>
        <legend>Сведения о пациенте</legend>

        <label>
          Фамилия, имя, отчество (при наличии):
          <input
            type="text"
            name="patientName"
            value={form.patientName}
            onChange={handleChange}
            placeholder="ФИО пациента"
            required
          />
        </label>

        <label>
          Дата рождения:
          <input
            type="date"
            name="birthDate"
            value={form.birthDate}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Пол:
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
          >
            <option value="">Выберите пол</option>
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
            <option value="other">Другой</option>
          </select>
        </label>
      </fieldset>

      <fieldset>
        <legend>Регистрация по месту жительства</legend>

        <label>
          Субъект РФ:
          <input
            type="text"
            name="residence.region"
            value={form.registrationResidence.region}
            onChange={handleChange}
            placeholder="Регион"
            required
          />
        </label>

        <label>
          Район:
          <input
            type="text"
            name="residence.district"
            value={form.registrationResidence.district}
            onChange={handleChange}
            placeholder="Район"
          />
        </label>

        <label>
          Город:
          <input
            type="text"
            name="residence.city"
            value={form.registrationResidence.city}
            onChange={handleChange}
            placeholder="Город"
            required
          />
        </label>

        <label>
          Населенный пункт:
          <input
            type="text"
            name="residence.locality"
            value={form.registrationResidence.locality}
            onChange={handleChange}
            placeholder="Населенный пункт"
          />
        </label>

        <label>
          Улица:
          <input
            type="text"
            name="residence.street"
            value={form.registrationResidence.street}
            onChange={handleChange}
            placeholder="Улица"
            required
          />
        </label>

        <label>
          Дом:
          <input
            type="text"
            name="residence.house"
            value={form.registrationResidence.house}
            onChange={handleChange}
            placeholder="Дом"
            required
          />
        </label>

        <label>
          Строение/корпус:
          <input
            type="text"
            name="residence.building"
            value={form.registrationResidence.building}
            onChange={handleChange}
            placeholder="Строение/корпус"
          />
        </label>

        <label>
          Квартира:
          <input
            type="text"
            name="residence.apartment"
            value={form.registrationResidence.apartment}
            onChange={handleChange}
            placeholder="Квартира"
          />
        </label>
      </fieldset>

      <fieldset>
        <legend>Регистрация по месту пребывания</legend>

        <label>
          Субъект РФ:
          <input
            type="text"
            name="stay.region"
            value={form.registrationStay.region}
            onChange={handleChange}
            placeholder="Регион"
          />
        </label>

        <label>
          Район:
          <input
            type="text"
            name="stay.district"
            value={form.registrationStay.district}
            onChange={handleChange}
            placeholder="Район"
          />
        </label>

        <label>
          Город:
          <input
            type="text"
            name="stay.city"
            value={form.registrationStay.city}
            onChange={handleChange}
            placeholder="Город"
          />
        </label>

        <label>
          Населенный пункт:
          <input
            type="text"
            name="stay.locality"
            value={form.registrationStay.locality}
            onChange={handleChange}
            placeholder="Населенный пункт"
          />
        </label>

        <label>
          Улица:
          <input
            type="text"
            name="stay.street"
            value={form.registrationStay.street}
            onChange={handleChange}
            placeholder="Улица"
          />
        </label>

        <label>
          Дом:
          <input
            type="text"
            name="stay.house"
            value={form.registrationStay.house}
            onChange={handleChange}
            placeholder="Дом"
          />
        </label>

        <label>
          Строение/корпус:
          <input
            type="text"
            name="stay.building"
            value={form.registrationStay.building}
            onChange={handleChange}
            placeholder="Строение/корпус"
          />
        </label>

        <label>
          Квартира:
          <input
            type="text"
            name="stay.apartment"
            value={form.registrationStay.apartment}
            onChange={handleChange}
            placeholder="Квартира"
          />
        </label>
      </fieldset>

      <fieldset>
        <legend>Поступление и период нахождения</legend>

        <label>
          Поступил:
          <select
            name="admissionType"
            value={form.admissionType}
            onChange={handleChange}
            required
          >
            <option value="">Выберите</option>
            <option value="1">В стационар</option>
            <option value="2">В дневной стационар</option>
          </select>
        </label>

        <div className="hospital-period">
          <div>
            <label>
              Период с (дата):
              <input
                type="date"
                name="hospitalPeriodStartDate"
                value={form.hospitalPeriodStartDate}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Время (час):
              <input
                type="number"
                name="hospitalPeriodStartTimeHour"
                value={form.hospitalPeriodStartTimeHour}
                onChange={handleChange}
                min="0"
                max="23"
                required
              />
            </label>

            <label>
              Время (мин):
              <input
                type="number"
                name="hospitalPeriodStartTimeMinute"
                value={form.hospitalPeriodStartTimeMinute}
                onChange={handleChange}
                min="0"
                max="59"
                required
              />
            </label>
          </div>

          <div>
            <label>
              По (дата):
              <input
                type="date"
                name="hospitalPeriodEndDate"
                value={form.hospitalPeriodEndDate}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Время (час):
              <input
                type="number"
                name="hospitalPeriodEndTimeHour"
                value={form.hospitalPeriodEndTimeHour}
                onChange={handleChange}
                min="0"
                max="23"
                required
              />
            </label>

            <label>
              Время (мин):
              <input
                type="number"
                name="hospitalPeriodEndTimeMinute"
                value={form.hospitalPeriodEndTimeMinute}
                onChange={handleChange}
                min="0"
                max="59"
                required
              />
            </label>
          </div>
        </div>

        <label>
          Количество дней нахождения:
          <input
            type="number"
            name="daysInHospital"
            value={form.daysInHospital}
            onChange={handleChange}
            min="0"
            required
          />
        </label>
      </fieldset>

      <fieldset>
        <legend>Исход и результат госпитализации</legend>

        <label>
          Исход госпитализации:
          <select
            name="dischargeOutcome"
            value={form.dischargeOutcome}
            onChange={handleChange}
            required
          >
            <option value="">Выберите</option>
            <option value="1">Выписан</option>
            <option value="2">В дневной стационар</option>
            <option value="3">В стационар</option>
          </select>
        </label>

        <label>
          Результат госпитализации:
          <select
            name="dischargeResult"
            value={form.dischargeResult}
            onChange={handleChange}
            required
          >
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
          value={form.additionalInfo}
          onChange={handleChange}
          placeholder="Введите дополнительные сведения"
          rows="4"
        />
      </label>

      <button type="submit">Отправить</button>
    </form>
  );
};

export default LittlePage;

