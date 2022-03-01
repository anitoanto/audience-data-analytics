import { useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import "./metrics.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// firebaseConfig for other project which host face tracking site.
const firebaseConfig = {
  // add your face tracking site firebase config here.
};

export default function Metrics(data) {
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const id = data.data;

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  const dataRef = ref(db, "ada-makeaton-tracking-default-rtdb/");
  onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    // console.log(data);
    let total = 0;
    let active = 0;
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var val = data[key];
        if (val.data.mid == id) {
          total++;
          if (val.data.isPresent == "1") {
            active++;
          }
        }
      }
    }
    setTimeout(() => {
      setActiveUsers(active);
      setTotalUsers(total);
    }, 200);
  });

  return (
    <div>
      <div>Total Attendees: {totalUsers}</div>
      <div>Active Participants: {activeUsers}</div>
      <br />
      <div>Percentage active: {100 * (activeUsers / totalUsers)} %</div>
      <div className="pie">
        <PieChart
          // reveal={0.5}
          data={[
            {
              title: "Total Attendees",
              value: totalUsers - activeUsers,
              color: "#151D3B",
            },
            {
              title: "Active Participants",
              value: activeUsers,
              color: "#D82148",
            },
          ]}
        />
      </div>
    </div>
  );
}
