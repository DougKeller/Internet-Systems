/* JDBC API Example 
by Dr. Xiao 
11/04/2008 
*/

<%@page import="java.sql.*"%>  
<%

// Declare needed variables
Connection con;
DatabaseMetaData md;
String qs;
Statement stmt;
ResultSet rs;
out.println("\n <br>");

// Load DiverManager
Class.forName("com.mysql.jdbc.Driver").newInstance();
//Class.forName("com.microsoft.jdbc.sqlserver.SQLServerDriver");
out.println("Connecting ...\n <br>");

try {

// Open Database connection
con = DriverManager.getConnection("jdbc:mysql://db1.cs.uakron.edu:3306/xiaotest","xiaotest","wpdb");
// con = DriverManager.getConnection("jdbc:microsoft:sqlserver://130.101.10.2:1433;databasename=xiaodb","xiaostudent","cs575");
out.println("Connection established.\n <br>");

stmt = con.createStatement(); // SQL statement object  

//Create tables
qs="create table Sailors(sid integer, sname varchar(32), rating integer, age real)";
stmt.executeUpdate(qs);
	out.println("Table created.\n <br>");

//Insert data
qs="insert into Sailors (sid,sname,rating,age) values (18,'jones',3,30.0)";
stmt.executeUpdate(qs);
qs="insert into Sailors (sid,sname,rating,age) values (41,'jonah',6,56.0)";
stmt.executeUpdate(qs);
qs="insert into Sailors (sid,sname,rating,age) values (22,'ahab',7,44.0)";
stmt.executeUpdate(qs);
qs="insert into Sailors (sid,sname,rating,age) values (63,'moby',8,15.0)";
stmt.executeUpdate(qs);
	out.println("Data inserted.\n <br>");


//Query the data
qs="select * from Sailors";
rs=stmt.executeQuery(qs);

//Show results
out.println("Records in the table: \n <br>");
out.println("sid\t sname\t rating\t age\n <br>");
while(rs.next())
{
out.println(rs.getString("sid")+"\t"+rs.getString("sname")+"\t"+rs.getString("rating")+"\t"+rs.getString("age"));
out.println("<br>");
}
rs.close();

/*
//Get meta data
md = con.getMetaData();
// print information about the driver:
//out.println("\nDriver name:" + md.getDriverName() + "\n<br>Driver version: " + md.getDriverVersion() +"\n<br>");
ResultSet trs=md.getTables(null,null,null,null);
String tableName;
while(trs.next())
{
    tableName = trs.getString("TABLE_NAME");
    System.out.println("Table: " + tableName);
    //print all attributes
    ResultSet crs = md.getColumns(null,null,tableName,null);
    while(crs.next()) out.println(crs.getString("COLUMN_NAME") + ", ");
    //crs.close();
}
//trs.close();
*/

//Clean up
out.println("Closing the session ...\n <br>");
//Drope the tables
qs="drop table Sailors";
stmt.executeUpdate(qs);
stmt.close();
con.close();
out.println("Session closed.\n <br>");
}

catch (Exception e) {
out.println(e.toString());  // Error message to display
}

%>

 

