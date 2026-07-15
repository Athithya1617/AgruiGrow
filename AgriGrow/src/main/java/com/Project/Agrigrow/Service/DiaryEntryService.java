package com.Project.Agrigrow.Service;

import com.Project.Agrigrow.Entity.DiaryEntry;
import com.Project.Agrigrow.Repository.DiaryEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiaryEntryService {

    @Autowired
    private DiaryEntryRepository diaryEntryRepository;

    public List<DiaryEntry> getAllEntries() {
        // Return latest entries first (sorted by id desc)
        return diaryEntryRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    public DiaryEntry createEntry(DiaryEntry entry) {
        return diaryEntryRepository.save(entry);
    }

    public void deleteEntry(Long id) {
        diaryEntryRepository.deleteById(id);
    }
}
