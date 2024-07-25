import React from "react";
import "./sidebar.css";
export default function Sidebar() {
  return (
    <div className="sidebar-container">
      <div className="sidebar-view _name_home _shown _view_full"></div>
      <div
        className="sidebar-toggle-button _collapsed _name_home"
        aria-hidden="true"
      >
        <span
          className="inline-image _loaded icon sidebar-toggle-button__icon"
          aria-hidden="true"
          role="button"
          tabindex="-1"
          style={{ fontSize: "0px", lineHeight: 0 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.378 9.85c.28-.47.062-.85-.485-.85H9.106c-.548 0-.763.382-.484.85l2.87 4.799c.28.469.736.467 1.016 0l2.87-4.8z"
              fill="currentColor"
            ></path>
          </svg>
        </span>
      </div>
    </div>
  );
}
