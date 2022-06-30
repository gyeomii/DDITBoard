<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	//delete된 행의 갯수 반환
	int del = (int)request.getAttribute("del");
	int a = del;
%>

{
	"data" : "<%=del %>"
}
