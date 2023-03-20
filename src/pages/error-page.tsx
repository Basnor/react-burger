import React from "react";

import styles from "./error-page.module.css";

function ErrorPage() {
  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-large mb-8">Oops!</h1>
      <p className="text text_type_main-default text_color_inactive">Sorry, an unexpected error has occurred.</p>
    </div>
  );
}

export default ErrorPage;
