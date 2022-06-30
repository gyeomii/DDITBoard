package kr.or.ddit.board.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import kr.or.ddit.board.dao.BoardDaoImpl;
import kr.or.ddit.board.dao.IBoardDao;
import kr.or.ddit.board.vo.BoardVO;
import kr.or.ddit.board.vo.ReplyVO;

public class BoardServiceImpl implements IBoardService {
	
	private BoardDaoImpl dao;
	private static BoardServiceImpl service;
	
	private BoardServiceImpl(){
		dao = BoardDaoImpl.getDao();
	}
	
	public static BoardServiceImpl getService(){
		if(service == null) service = new BoardServiceImpl();
		return service;
	}

	@Override
	public int countList(String keyword) {
		int cnt = 0;
		try {
			cnt = dao.countList(keyword);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return cnt;
	}

	@Override
	public List<BoardVO> boardList(Map<String, Object> map) {

		List<BoardVO> list = null;
		try {
			list = dao.boardList(map);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}
	
	@Override
	public int insertBoard(BoardVO vo) {
		int seq = 0;
		try {
			seq = dao.insertBoard(vo);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return seq;
	}

	@Override
	public int insertReply(ReplyVO vo) {
		
		int seq = 0;
		try {
			seq = dao.insertReply(vo);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return seq;
	}

	@Override
	public List<ReplyVO> replyList(int bonum) {

		List<ReplyVO> list = null;
		
		try {
			list = dao.replyList(bonum);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public int replyUpdate(ReplyVO vo) {
		int udt = 0;
		try {
			udt = dao.replyUpdate(vo);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return udt;
	}
	
	@Override
	public int replyDelete(int renum) {
		int del = 0;
		try {
			del = dao.replyDelete(renum);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return del;
	}

	@Override
	public int boardDelete(int bonum) {
		int del = 0;
		try {
			del = dao.boardDelete(bonum);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return del;
	}

	@Override
	public int boardUpdate(BoardVO vo) {
		int udt = 0;
		try {
			udt = dao.boardUpdate(vo);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return udt;
	}

}
