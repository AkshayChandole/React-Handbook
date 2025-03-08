# [Connect Four Game](#connect-four-game)

## **Problem Statement:**  
Build a **Connect Four** game, where two players take turns dropping pieces into a grid. A player wins when they connect **four consecutive cells** **horizontally** or **vertically**.  

🕒 **Time Constraint:** Solving this in an hour requires strong problem-solving skills and hands-on practice.  

#### 🚀 **Follow-up Challenges:**  
1️⃣ **Configurable Grid:** Allow customization of the grid size.  
2️⃣ **Diagonal Wins:** Extend the winning condition to include diagonal connections.  
3️⃣ **Winning Highlight:** Visually highlight the four winning cells.  
4️⃣ **Flexible Winning Condition:** Detect any four connected cells using **Disjoint Set (Union-Find)** instead of DFS for efficiency.  

This challenge tests your understanding of **event delegation, state management, CSS, and game logic.** Unlike naïve implementations, you **don’t need an event listener for every grid cell!**  

💡 **Hint for Finding Connected Four Without DFS:** Consider using the **Disjoint Set (Union-Find) data structure** to efficiently track connected components.  

##### Starting screen:
![image](https://github.com/user-attachments/assets/f2ac5356-43ec-48eb-acd7-cce4781c5ec9)

#### Winning Scenario1 (Horizontal →):
![image](https://github.com/user-attachments/assets/35ad5218-8469-4d75-b519-6a54bd0a5f62)

#### Winning Scenario2 (Vertical ↓):
![image](https://github.com/user-attachments/assets/d15d3cc5-3009-4b9d-bb69-621701023671)

#### Winning Scenario3 (Diagonal ↘):
![image](https://github.com/user-attachments/assets/3d1366ab-8aa1-4cf6-9d41-e63578c1d396)

#### Winning Scenario4 (Diagonal ↙):
![image](https://github.com/user-attachments/assets/500231a0-66f4-4cff-9bb3-31033ec533dd)

## **Solution:**


**Codesandbox link** - [https://codesandbox.io/p/sandbox/traffic-light-simulation-lr7s92](https://codesandbox.io/p/sandbox/connect-four-game-rwxf8v)

**Preview** - https://rwxf8v.csb.app/


---



