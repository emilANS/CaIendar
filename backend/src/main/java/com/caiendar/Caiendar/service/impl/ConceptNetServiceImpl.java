package com.caiendar.Caiendar.service.impl;

import com.caiendar.Caiendar.service.ConceptNetService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ConceptNetServiceImpl implements ConceptNetService {

    // NOTE: REMOVE THIS CODE IF DON'T FIND USE IN A TIME
    private final String API_URL = "https://api.conceptnet.io/c/";

    public void getRelatedWords(String word, String language) {

        RestTemplate restTemplate = new RestTemplate();

        String url = API_URL + "/" + language + "/" + word;

        String response = restTemplate.getForObject(url, String.class);
        JSONObject json = new JSONObject(response);
        JSONArray edges = json.getJSONArray("edges");

        for (int i = 0; i < edges.length(); i++) {
            JSONObject edge = edges.getJSONObject(i);
            String rel = edge.getJSONObject("rel").getString("label");
            String start = edge.getJSONObject("start").getString("label");
            String end = edge.getJSONObject("end").getString("label");


            System.out.println(rel + ": " + start + " -> " + end);
        }
    }

}
