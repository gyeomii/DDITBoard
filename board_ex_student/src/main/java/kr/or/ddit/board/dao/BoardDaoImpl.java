package kr.or.ddit.board.dao;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.ibatis.sqlmap.client.SqlMapClient;

import kr.or.ddit.board.vo.BoardVO;
import kr.or.ddit.board.vo.ReplyVO;
import kr.or.ddit.ibatis.config.BuildedSqlMapClient;

public class BoardDaoImpl implements IBoardDao {
	
	private SqlMapClient client;
	private static BoardDaoImpl dao;
	
	private BoardDaoImpl(){
		client = BuildedSqlMapClient.getSqlMapClient();
	}
	
	public static BoardDaoImpl getDao(){
		if(dao == null) dao = new BoardDaoImpl();
		return dao;
	}
	

	@Override
	public int countList(String keyword) throws SQLException {
		return (int) client.queryForObject("board.countList", keyword);
	}

	@Override
	public List<BoardVO> boardList(Map<String, Object> map) throws SQLException {
		return client.queryForList("board.boardList", map);
	}

	@Override
	public int insertBoard(BoardVO vo) throws SQLException {
		return (int) client.insert("board.insertBoard", vo);
	}
	
	@Override
	public int insertReply(ReplyVO vo) throws SQLException {
		return (int) client.insert("board.insertReply", vo);
	}

	@Override
	public List<ReplyVO> replyList(int bonum) throws SQLException {
		return client.queryForList("board.replyList", bonum);
	}

	@Override
	public int replyUpdate(ReplyVO vo) throws SQLException {
		return client.update("board.replyUpdate", vo);
	}

	@Override
	public int replyDelete(int renum) throws SQLException {
		return client.delete("board.replyDelete", renum);
	}

	@Override
	public int boardDelete(int bonum) throws SQLException {
		return client.delete("board.boardDelete", bonum);
	}

	@Override
	public int boardUpdate(BoardVO vo) throws SQLException {
		return client.update("board.boardUpdate", vo);
	}
}
