package com.Project.Agrigrow.Controller;

import com.Project.Agrigrow.Entity.EconomicsLog;
import com.Project.Agrigrow.Service.EconomicsLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/economics")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173", "https://athithya1617.github.io"})
public class EconomicsLogController {

    @Autowired
    private EconomicsLogService economicsLogService;

    @GetMapping
    public List<EconomicsLog> getAllLogs() {
        return economicsLogService.getAllLogs();
    }

    @PostMapping
    public EconomicsLog createLog(@RequestBody EconomicsLog log) {
        return economicsLogService.createLog(log);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLog(@PathVariable Long id) {
        economicsLogService.deleteLog(id);
        return ResponseEntity.ok().build();
    }
}
