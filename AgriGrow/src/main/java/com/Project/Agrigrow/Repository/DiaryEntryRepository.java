package com.Project.Agrigrow.Repository;

import com.Project.Agrigrow.Entity.DiaryEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiaryEntryRepository extends JpaRepository<DiaryEntry, Long> {
}
