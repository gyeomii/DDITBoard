package kr.or.ddit.board.controller;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.beanutils.BeanUtils;

import kr.or.ddit.board.service.BoardServiceImpl;
import kr.or.ddit.board.service.IBoardService;
import kr.or.ddit.board.vo.BoardVO;

/**
 * Servlet implementation class BoardWrite
 */
@WebServlet("/Write")
public class BoardWrite extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		//한글데이터 포함시 setting - post일때 만
		request.setCharacterEncoding("utf-8");
		
		//0. 요청데이터 가져오기
		BoardVO vo = new BoardVO();
		try {
			BeanUtils.populate(vo, request.getParameterMap());
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		vo.setWip(request.getRemoteAddr()); //클라이언트 ip얻기
		
		//1. 서비스객체 얻기
		IBoardService service = BoardServiceImpl.getService();
		
		//2. 서비스 메소드 호출
		int seq = service.insertBoard(vo);
		
		//3. 결과값 request에 저장 및 jsp로 포워딩
		request.setAttribute("seq", seq);
		request.getRequestDispatcher("board/result.jsp").forward(request, response);
		
	}
}
