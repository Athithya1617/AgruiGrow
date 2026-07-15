package com.Project.Agrigrow.Controller;

import com.Project.Agrigrow.Entity.DiaryEntry;
import com.Project.Agrigrow.Service.DiaryEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diary")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173", "https://athithya1617.github.io"})
public class DiaryEntryController {

    @Autowired
    private DiaryEntryService diaryEntryService;

    @GetMapping
    public List<DiaryEntry> getAllEntries() {
        return diaryEntryService.getAllEntries();
    }

    @PostMapping
    public DiaryEntry createEntry(@RequestBody DiaryEntry entry) {
        return diaryEntryService.createEntry(entry);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEntry(@PathVariable Long id) {
        diaryEntryService.deleteEntry(id);
        return ResponseEntity.ok().build();
    }
}
