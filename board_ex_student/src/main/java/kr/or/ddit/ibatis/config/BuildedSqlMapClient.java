package kr.or.ddit.ibatis.config;

import java.io.IOException;
import java.io.Reader;
import java.nio.charset.Charset;

import com.ibatis.common.resources.Resources;
import com.ibatis.sqlmap.client.SqlMapClient;
import com.ibatis.sqlmap.client.SqlMapClientBuilder;

public class BuildedSqlMapClient {
	
	private static SqlMapClient smc;
	
	static{
	
		Reader rd = null;
		try {
			Charset charset = Charset.forName("utf-8");
			Resources.setCharset(charset);
			
			rd = Resources.getResourceAsReader("kr/or/ddit/ibatis/config/SqlMapConfig.xml");
			
			smc = SqlMapClientBuilder.buildSqlMapClient(rd);
		} catch (IOException e) {
			throw new RuntimeException("SqlMapClient객체 생성 실패" + e,e);
		}finally{
			if(rd != null) try{ rd.close();} catch (IOException e){}
		}
		
	}
	
	public static SqlMapClient getSqlMapClient(){
		return smc;
	}
}
