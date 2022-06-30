<%@page import="kr.or.ddit.board.vo.ReplyVO"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
//servlet에서 값 가져오기
List<ReplyVO> list = (List<ReplyVO>)request.getAttribute("replyList");
%>
[
<%
	if(list != null && list.size() > 0){
		
		for(int i=0; i<list.size(); i++){
			ReplyVO vo = list.get(i);
			if(i>0) out.print(",");
%>
			{
				"renum"		: "<%=vo.getRenum() %>",
				"bonum"		: "<%=vo.getBonum() %>",
				"name"		: "<%=vo.getName() %>",
				"cont"		: "<%=vo.getCont().replaceAll("\r", "").replaceAll("\n", "<br>") %>",
				"redate"	: "<%=vo.getRedate() %>"
			}
<%			
		}//for end
	}//if end
%>
]
