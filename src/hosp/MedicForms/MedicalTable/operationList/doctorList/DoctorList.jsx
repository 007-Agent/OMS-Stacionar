import React, { useState } from "react";
import "./doctorlist.scss";
export default function DoctorList() {
  // Примерный список врачей (замените на реальный props или API-запрос)
  const doctors = [
    { id: 1, name: "Иванов Иван Иванович" },
    { id: 2, name: "Петров Петр Петрович" },
    { id: 3, name: "Сидоров Сидор Сидорович" },
    { id: 4, name: "Кузнецова Анна Сергеевна" },
    { id: 5, name: "Смирнова Ольга Викторовна" },
  ];

  return (
    <div className="doctor-list">
      <input
        type="text"
        placeholder="Поиск врача..."
        className="doctor-search-input"
      />

      <ul className="doctor-list-items">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <li key={doctor.id} className="doctor-list-item">
              {doctor.name}
            </li>
          ))
        ) : (
          <li className="no-results">Врачи не найдены</li>
        )}
      </ul>

      <button className="close-doctor-list">Закрыть</button>
    </div>
  );
}
