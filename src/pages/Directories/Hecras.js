import axios from "axios";
import React, { useEffect, useState } from "react";
import BASE_URL from "../../config";
import eyeIcon from "../../assets/icon/🦆eye_.svg";
import editIcon from "../../assets/icon/🦆 edit_.svg";
import deletIcon from "../../assets/icon/🦆delete.svg";
import DeleteModal from "../../common/DeleteModal";
import AddItem from "../../common/AddItem";
import EditItem from "../../common/EditItem";
import { token } from "../../token";
import { useTranslation } from "react-i18next";
const Hecras = () => {
  let [showdelete, setShow] = useState(false);
  let [showadd, setShowAdd] = useState(false);
  let [showedit, setShowEdit] = useState(false);
  const { t } = useTranslation();
  let adresValue = [
    {
      name: "Andijon",
      value: "andijon",
    },
    {
      name: "Buxoro",
      value: "buxoro",
    },
    {
      name: "Samarqand",
      value: "samarqand",
    },
    {
      name: "Namangan",
      value: "namangan",
    },
    {
      name: "Jizzax",
      value: "jizzax",
    },
    {
      name: "Farg'ona",
      value: "farg'ona",
    },
    {
      name: "Qashqadaryo",
      value: "qashqadaryo",
    },
    {
      name: "Toshkent",
      value: "toshkent",
    },
  ];

  let [id, setId] = useState(0);
  let [editId, setEditId] = useState(0);
  let [data, setData] = useState([]);
  let [torf, setTorf] = useState(0);
  let GetDats = async () => {
    try {
      let res = await axios.get(BASE_URL.api.BASE_URL + "hecras/variable/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setData(res.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetDats();
  }, [showadd, showdelete, torf]);

  return (
    <div className="hecras">
      <div className="hecras__container">
        <div className="hecras__container__header">
          <p>{t("Information about stations")}</p>
          <div className="buttons__group">
            <button className="button_export">Экспорт</button>
            <button className="button_add" onClick={() => setShowAdd(!showadd)}>
              {t("Add")}
            </button>
            <button className="button_delete">Удалить</button>
          </div>
        </div>
        <div className="hecras__container__datas">
          <table>
            <tr style={{ backgroundColor: "#526D82", color: "white" }}>
              {/* <th className='thSellect'><input style={{width:'20px',height:'20px'}} type='checkbox'/></th> */}
              <th style={{ textAlign: "center", padding: "0 20px" }}>№</th>
              <th style={{ textAlign: "center", padding: "0px 100px" }}>
                Oписание
              </th>
              <th style={{ textAlign: "center", padding: "0px 100px" }}>
                {t("variable")}
              </th>
              <th style={{ textAlign: "center", padding: "0px 100px" }}>
                {t("Address")}
              </th>
              <th style={{ textAlign: "center", padding: "0px 35px" }}>
                {t("Actions")}
              </th>
            </tr>
            <tr style={{ backgroundColor: "#DDE6ED" }}>
              {/* <th className="thSellect"></th> */}
              <th></th>
              <th style={{ padding: "3px 13px 5px 10px" }}>
                <input
                  style={{ width: "100%", border: "none", height: "25px" }}
                  type=""
                />
              </th>
              <th></th>
              <th style={{ padding: "3px 13px 5px 10px" }}>
                {/* <select
                  style={{ width: "100%", border: "none", height: "25px" }}
                >
                  {adresValue.map((item) => {
                    return <option value={item.value}>{item.name}</option>;
                  })}
                </select> */}
              </th>
              <th></th>
            </tr>
            {data.map((e, i) => (
              <tr key={i}>
                <td style={{ textAlign: "center", paddingTop: "5px" }}>
                  {i + 1}
                </td>
                <td style={{ textAlign: "center", paddingTop: "5px" }}>
                  {e.description}
                </td>
                <td style={{ textAlign: "center", paddingTop: "5px" }}>
                  {e.variable}
                </td>
                <td style={{ textAlign: "center", paddingTop: "5px" }}>
                  {e.code}
                </td>

                <td>
                  <div className="settingscol">
                    <button>
                      <img style={{ width: "20px" }} src={eyeIcon} alt="alt" />
                    </button>
                    <button
                      onClick={() => {
                        setShowEdit(true);
                        setEditId(e.id);
                      }}
                    >
                      <img style={{ width: "20px" }} src={editIcon} alt="alt" />
                    </button>
                    <button
                      onClick={() => {
                        setShow(true);
                        setId(e.id);
                      }}
                    >
                      <img
                        style={{ width: "20px" }}
                        src={deletIcon}
                        alt="alt"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
      <AddItem show={showadd} onCloseClick={() => setShowAdd(!showadd)} />
      <EditItem
        setTorf={setTorf}
        torf={torf}
        show={showedit}
        id={editId}
        onCloseClick={() => setShowEdit(!showedit)}
      />
      <DeleteModal
        setTorf={setTorf}
        torf={torf}
        id={id}
        show={showdelete}
        onCloseClick={() => setShow(!showdelete)}
      />
    </div>
  );
};

export default Hecras;
