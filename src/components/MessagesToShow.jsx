import React from "react";
import messagesToShowCss from "../cssModules/MessagesToShow.module.css";

export default function MessagesToShow({ message, onClose }) {
  if (message === false) return null;

  return (
    <div className={messagesToShowCss.containerOut}>
      <div className={messagesToShowCss.containerMed}>
        <div className={messagesToShowCss.containerIn}>
          <span>{message === "nameNotFound" ? "There is no country with that name" : null}</span>
          <span>{message === "activitiesNotFound" ? "There are no activities created" : null}</span>
          <span>{message === "activityCreated" ? "The tourist activity has been successfully created" : null}</span>
          <span>
            {message === "countryAlreadySelected" ? "The country is already selected. Please choose another one" : null}
          </span>
          <span>{message === "noLettersSearch" ? "Please type a country name" : null}</span>
          <span>{message === "spacesSearch" ? "Spaces are not allowed" : null}</span>
          <span>{message === "numbersSearch" ? "Numbers are not allowed" : null}</span>
          <span>{message === "specialCharactersSearch" ? "Special characters are not allowed" : null}</span>
        </div>
        <div className={messagesToShowCss.closing}>
          <button type="button" onClick={() => onClose()} className={messagesToShowCss.button}>
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
