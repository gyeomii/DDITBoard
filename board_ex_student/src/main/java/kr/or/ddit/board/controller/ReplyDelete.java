package kr.or.ddit.board.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.or.ddit.board.service.BoardServiceImpl;
import kr.or.ddit.board.service.IBoardService;

/**
 * Servlet implementation class ReplyDelete
 */
@WebServlet("/ReplyDelete")
public class ReplyDelete extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ReplyDelete() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		//0. 요청시 데이터 가져오기
		int renum = Integer.parseInt(request.getParameter("vidx"));
		
		//1. 서비스 객체 얻어오기 
		IBoardService service = BoardServiceImpl.getService();
		
		//2. 서비스 메소드 호출
		int res = service.replyDelete(renum);
		
		//3. request에 값 저장
		request.setAttribute("seq", res);
		
		//4. jsp로 포워딩
		request.getRequestDispatcher("board/result.jsp").forward(request, response);
	
	}

}
