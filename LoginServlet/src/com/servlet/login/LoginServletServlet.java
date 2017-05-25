package com.servlet.login;

import java.io.IOException;
import java.util.HashMap;

import javax.servlet.http.*;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.*;

@SuppressWarnings("serial")
public class LoginServletServlet extends HttpServlet {
	
	ObjectMapper objmap         =  new ObjectMapper();
	DatastoreService datastore  =  DatastoreServiceFactory.getDatastoreService();
    Entity      user            =  new Entity("userCredentials");
    Query       query           =  new Query("userCredentials");
    HashMap <String,String>  hashmap  = new HashMap();
	
    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		
    	System.out.println("test commit");
    	System.out.println("test commit");
    	System.out.println("test commit");
    	System.out.println("test commit");
    	System.out.println("test commit");
    	System.out.println("test commit");
    	System.out.println("test commit");
		
		
		String email         =  req.getParameter("loginUserEmail").toLowerCase();
		String password      =  req.getParameter("loginUserPass"); 		
		Query q              =  new Query("userCredentials").setFilter( new FilterPredicate("Email" , FilterOperator.EQUAL,email));		
		PreparedQuery pq     =  datastore.prepare(q);
		Entity results       =  pq.asSingleEntity();		
		
		if(results == null){

			hashmap.put("status", "EmailIdDoesNotExit");
			objmap.writeValue(resp.getOutputStream(), hashmap);
			
		}else{
		
        	for( Entity result : pq.asIterable()){
        		
        		String EntityEmail    = (String) result.getProperty("Email");
        		String EntityPassword = (String) result.getProperty("password");
        		        		
        		if(email.equalsIgnoreCase(EntityEmail) && password.equals(EntityPassword)){
        			hashmap.put("status", "ValidCredentials");
        			objmap.writeValue(resp.getOutputStream(), hashmap);
        		}else{		
        			
        			hashmap.put("status", "InvalidCredentials");
        			objmap.writeValue(resp.getOutputStream(), hashmap);
        			
        			}
        	}		
	}
  }
	
	public void doPost(HttpServletRequest req, HttpServletResponse res) throws JsonGenerationException, JsonMappingException, IOException{
		
     try{
		
		String email      =   req.getParameter("signUpuserEmail").toLowerCase();
		String password   =   req.getParameter("signUpuserPass");			
		Query q           =   new Query("userCredentials").setFilter( new FilterPredicate("Email" , FilterOperator.EQUAL,email));				
		PreparedQuery pq  =   datastore.prepare(q);
		Entity result     =   pq.asSingleEntity();
		
		if(result == null){

			user.setProperty("Email", email);
			user.setProperty("password", password);
			datastore.put(user);
			hashmap.put("status", "NewlyRegistered");
			objmap.writeValue(res.getOutputStream(), hashmap);
		}
		else{
		
        	for( Entity result1 : pq.asIterable()){     		
        		String EntityEmail    = (String) result1.getProperty("Email");
        		        		
        		if(email.equalsIgnoreCase(EntityEmail)){
        			hashmap.put("status", "AlreadyRegistered");
        			objmap.writeValue(res.getOutputStream(), hashmap);
        		}
        	}
		}
				
	 }catch(Exception e){
		System.out.println("exception " + e);
	 }
	
}
	
   public void doPut(HttpServletRequest req, HttpServletResponse res) throws JsonGenerationException, JsonMappingException, IOException{
	
	   try{
		
		String email      =   req.getParameter("changeUserEmail").toLowerCase();
		String password   =   req.getParameter("changeUserPass");	
		Query q           =   new Query("userCredentials").setFilter( new FilterPredicate("Email" , FilterOperator.EQUAL,email));				
		PreparedQuery pq  =   datastore.prepare(q);
		Entity entity     =   pq.asSingleEntity();
		
	if(entity == null){
		
		hashmap.put("status", "NoEmailId");
		objmap.writeValue(res.getOutputStream(), hashmap);
		
	}else {
		
		for(Entity result : pq.asIterable()){
			
			String EntityEmail = (String) result.getProperty("Email");
			if(email.equalsIgnoreCase(EntityEmail)){
				
				entity.setProperty("password", password);
				datastore.put(entity);
				hashmap.put("status", "passwordChanged");
				objmap.writeValue(res.getOutputStream(),hashmap);	
				
				}
			
		}
	}
		
	}catch(Exception e){
		System.out.println(" Exception "+ e);
	}
		
	
}
		
	
}