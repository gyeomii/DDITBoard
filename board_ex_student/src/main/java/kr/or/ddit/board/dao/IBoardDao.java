package kr.or.ddit.board.dao;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import kr.or.ddit.board.vo.BoardVO;
import kr.or.ddit.board.vo.ReplyVO;

public interface IBoardDao {

	//전체 글 갯수 가져오기
	public int countList(String keyword) throws SQLException;
	
	//페이지 별 리스트 가져오기
	public List<BoardVO> boardList(Map<String, Object> map) throws SQLException;
	
	//글쓰기 저장
	public int insertBoard(BoardVO vo) throws SQLException;
	
	//댓글 저장 - renum 리턴
	public int insertReply(ReplyVO vo) throws SQLException;
	
	//댓글 리스트 조회
	public List<ReplyVO> replyList(int bonum) throws SQLException;
	
	//댓글 수정
	public int replyUpdate(ReplyVO vo) throws SQLException;
	
	//댓글 삭제
	public int replyDelete(int renum) throws SQLException;
	
	//게시글 삭제
	public int boardDelete(int bonum) throws SQLException;
	
	//게시글 수정
	public int boardUpdate(BoardVO vo) throws SQLException;
}
