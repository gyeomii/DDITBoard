package kr.or.ddit.board.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.or.ddit.board.service.BoardServiceImpl;
import kr.or.ddit.board.service.IBoardService;
import kr.or.ddit.board.vo.BoardVO;

/**
 * Servlet implementation class BoardList
 */
@WebServlet("/List")
public class BoardList extends HttpServlet {
	private static final long serialVersionUID = 1L;


	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doPost(req, resp);
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		//한글데이터 포함시 setting - post일때 만
		request.setCharacterEncoding("utf-8");
//		String keyword = "4";
		String keyword = request.getParameter("keyword");
		
		//0. 요청시 전송되는 데이터 가져오기
		//getParameter return type : String -> Integer로 형변환
		int spage = 1;
		spage = request.getParameter("page") == null ? 1 : Integer.parseInt(request.getParameter("page"));
		
		//1. service클래스 객체 얻기
		IBoardService service = BoardServiceImpl.getService();
		
		//한 화면에 출력할 페이지 수
		int perPage = 2;
		
		//한 페이지에 출력할 글 갯수
		int perList = 5;
		
		//전체 글 갯수
		int count = service.countList(keyword);
		
		//전체 페이지 수 = 전체 글 갯수 / 페이지 당 글 갯수
		//round-반올림, ceil-올림, floor-내림, abs-절대값
		//double로 소수점을 발생시켜야 정상적인 값을 얻을 수 있다.
		//ex) 21/5일때 double형변환하지 않은 경우 : 4, double형변환한 경우 : 4.1
		int totalPage = (int)Math.ceil((double)count / (double)perList);
		
		//ex
//		System.out.println(">> " + 21 / perList);
//		System.out.println("double >> " + (double)21 / (double)perList);
		
		//페이지에 표시될 게시글 갯수 start, end 값 구하기
		//spage(현재페이지) 1page일 때 : (1-1)*5+1=1 
		//				 2page일 때 : (2-1)*5+1=6 
		//				 3page일 때 : (3-1)*5+1=11
		//				 4page일 때 : (4-1)*5+1=16
		int start = (spage - 1) * perList + 1;
		
		// 1page일 때 : 1+5-1=5 
		// 2page일 때 : 6+5-1=10 
		// 3page일 때 : 11+5-1=15
		// 4page일 때 : 16+5-1=20
		//end = perList(글갯수) * sPage도 가능
		int end = start + perList - 1;
		
		//ex)전체 글 갯수(count)보다 게시글 끝 값(end)이 더 클 경우, count값을 end에 대입 
		if(end > count) end = count;
		
		//화면에 보여지는 페이지 번호
		// 1page일 때 : ((1-1)/2*2)+1 = 1		2page일 때 : ((2-1)/2*2)+1 = 1 
		// 3page일 때 : ((3-1)/2*2)+1 = 3		4page일 때 : ((4-1)/2*2)+1 = 3 
		// 5page일 때 : ((5-1)/2*2)+1 = 5 	6page일 때 : ((6-1)/2*2)+1 = 5
		int startPage = ((spage - 1) / perPage * perPage) + 1;
		
		//ex
//		System.out.println("(spage-1)/perPage >> " + (spage-1)/perPage);
//		for(int i=1; i<=10; i++) {
//		  System.out.println(i + "page >> " + ( ((i-1)/perPage*perPage)+1) );
//		}
		
		// 1,2page일 때 : 1+2-1=2 
		// 3,4page일 때 : 3+2-1=4
		// 5,6page일 때 : 5+2-1=6
		int endPage = startPage + perPage - 1;
		if(endPage > totalPage) endPage = totalPage;
		
		//2. service메소드 호출하기 - 결과 값 받기 - List
		//HashMap은 해시 함수를 통해 '키'와 '값'이 저장되는 위치를 결정, 사용자는 그 위치를 알 수 없고,
		//삽입되는 순서와 들어 있는 위치 또한 관계 없음, 유일한 키를 가져야 함
		//키 값에 직접 산술적인 연산을 적용하여 항목이 저장되어 있는 테이블의 주소를 계산하여 항목에 접근하므로 빠름

		Map<String, Object> map = new HashMap<String, Object>();
		//페이지 별 게시글 시작과 끝 값
		map.put("start", start);
		map.put("end", end);
		map.put("keyword", keyword);
		
		List<BoardVO> list = service.boardList(map);
		
		//3. 결과 값을 request에 저장
		request.setAttribute("list", list);
		
		request.setAttribute("sPage", startPage);
		request.setAttribute("ePage", endPage);
		request.setAttribute("ttPage", totalPage);
	
		//4. jsp로 포워딩
		request.getRequestDispatcher("board/list.jsp").forward(request, response);
	}

}
