<%@page import="kr.or.ddit.board.vo.BoardVO"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
//servlet에서 가져오기 - getAttribute return type : Object (primitive type casting error발생가능)
List<BoardVO> list = (List<BoardVO>)request.getAttribute("list");
int sPage = (Integer)request.getAttribute("sPage");
int ePage = (Integer)request.getAttribute("ePage");
int ttPage = (Integer)request.getAttribute("ttPage");
%>
		{
			"sp"		: "<%=sPage %>",
			"ep"		: "<%=ePage %>",
			"tp"		: "<%=ttPage %>",
			"datas"	: [
<%
			//향상된 for문 사용시 index초기화 위치 주의
			int i = 0;
			for(BoardVO vo : list){
				if(i>0) out.print(",");
			
		// 	for(int i=0; i<list.size(); i++){ //}
		// 		BoardVO vo = list.get(i);
		// 		if(i>0) out.print(",");
%>		
				{
					"num"		: "<%=vo.getNum() %>",
					"subject"	: "<%=vo.getSubject() %>",
					"writer"	: "<%=vo.getWriter() %>",
					"mail"		: "<%=vo.getMail() %>",
<%				if(vo.getContent() != null){ %>
					"cont"		: "<%=vo.getContent().replaceAll("\r\n", "<br>") %>",
<%				}else{ %> 
					"cont"		: "",	
<%				} %>		
					"hit"		: "<%=vo.getHit() %>",
					"wdate"		: "<%=vo.getWdate() %>"
				}
<%		
				i++;
			}//for end
%>
			]
		}